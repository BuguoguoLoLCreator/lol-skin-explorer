import Fuse from "fuse.js";
import { Patch } from "./patch";
import { splitId } from "./helpers";

const FUSE_OPTIONS = { keys: ["name", "searchString"], threshold: 0.3 };
const NON_ALPHANUMERIC_REGEX = /[^A-Za-z0-9]/g;

/**
 * Handle the logic behind cache invalidation and triggering all the datasets
 * to fetch new copies.
 */
export class Store {
  patch = new Patch();
  changes = require("./.cache/changes.json");
  persistentVars = require("./.cache/persistentVars.json");

  constructor() {
    const { champions, skinlines, universes, skins, prestigeChromas } = this.patch;

    this.fuse = new Fuse(
      champions
        .map((c) => ({
          key: c.key,
          name: c.name,
          image: c.squarePortraitPath,
          type: "champion",
        }))
        .concat(
          universes.map((u) => ({
            id: u.id,
            name: u.name,
            type: "universe",
          }))
        )
        .concat(
          skinlines.map((l) => ({
            id: l.id,
            name: l.name,
            type: "skinline",
          }))
        )
        .concat(
          Object.values(skins).map((s) => {
            const cId = splitId(s.id)[0];
            const champ = champions.find((c) => c.id === cId);
            return {
              id: s.id,
              key: champ.key,
              name: s.name,
              image: s.tilePath,
              type: "skin",
            };
          })
        )
        .concat(
          prestigeChromas.map((pc) => ({
            id: pc.skinId,
            name: pc.name,
            image: pc.tilePath || pc.loadScreenPath,
            type: "prestigechroma",
          }))
        )
        .map((obj) => ({
          ...obj,
          searchString: obj.name.replace(NON_ALPHANUMERIC_REGEX, ""),
        })),
      FUSE_OPTIONS
    );
  }

  getLastUpdateTime() {
    if (!this.persistentVars || !this.persistentVars.lastUpdate) {
      return "未知";
    }
    
    return new Date(this.persistentVars.lastUpdate).toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  fuse = new Fuse([], FUSE_OPTIONS);
}

export const store = new Store();