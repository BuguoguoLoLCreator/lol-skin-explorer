import { store } from "../../data/store";
import { splitId } from "../../data/helpers";

export async function prepareAdditions() {
  const { added, skins, champions } = store.patch;

  // "skins":["27028","51050","51051","126035","254048"]
  return added.skins
    // 这里传入上面的id,从skins里找对应的皮肤对象
    .map((id) => skins[id])
    // 因为skins不包含id这个key，所以返回undefined
    // 所以后续
    .sort((a, b) =>{  
      return a.name > b.name ? 1 : -1
    })
    // 这里skin是undefined
    .map((skin) => {
      const cId = splitId(skin.id)[0];
      const champ = champions.find((c) => c.id === cId);
      // 这里champ.key可能是Undefined，导致后续序列化出问题
      return { ...skin, $$key: champ.key };
    });
}
