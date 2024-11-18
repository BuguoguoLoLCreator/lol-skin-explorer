import { CDRAGON, ROOT } from "./constants";
import { useProps } from "./contexts";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";

function isTextBox(element) {
  if (!element) return false;
  var tagName = element.tagName.toLowerCase();
  if (tagName === "textarea") return true;
  if (tagName !== "input") return false;
  var type = element.getAttribute("type").toLowerCase(),
    // if any of these input types is not supported by a browser, it will behave as input type text.
    inputTypes = [
      "text",
      "password",
      "number",
      "email",
      "tel",
      "url",
      "search",
      "date",
      "datetime",
      "datetime-local",
      "time",
      "month",
      "week",
    ];
  return inputTypes.indexOf(type) >= 0;
}

export function dataRoot(patch = "pbe") {
  return `${CDRAGON}/${patch}/plugins/rcp-be-lol-game-data/global/default`;
}


function bala(skinPath, patch){
  // 负责英雄名=>英雄id
  const {champions} = useProps()

  const isGreaterThan14dot9 = true
  // 从skinPath抽取皮肤ID
  // 现在通过英雄ID 皮肤ID patch拼凑路径

}

// asset(bala(skinPath,patch),patch)


function isGreaterThan14dot9(patch) {
  // Give param `patch` is always a string which
  // contains two parts separated by a dot.
  // MAJOR.MINOR 
  // should compare MAJOR first then MINOR
  // 14.10 > 14.9 > 14.1

  const [major1, minor1] = patch.split('.');
  const [major2, minor2] = '14.9'.split('.');

  return major1 > major2 || (major1 === major2 && minor1 > minor2);
}


//14.9聚焦图https://raw.communitydragon.org/{版本号}/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/{英雄数字ID}/{皮肤ID}.jpg
//14.9原画https://raw.communitydragon.org/{版本号}/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/{英雄数字ID}/{皮肤ID}.jpg


//14.9聚焦图https://raw.communitydragon.org/14.9/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/226/1000.jpg
//14.9原画https://raw.communitydragon.org/14.9/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/1/1000.jpg

//14.10 聚焦图https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/aatrox/skins/skin01/images/aatrox_splash_centered_1.jpg
//14.10 原画https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/aatrox/skins/skin01/images/aatrox_splash_uncentered_1.jpg

export function asset(path, patch = "pbe") {
  return path.replace("/lol-game-data/assets", dataRoot(patch)).toLowerCase();
}

export function splitId(id) {
  return [Math.floor(id / 1000), id % 1000];
}

export function championSkins(id, skins) {
  return Object.values(skins).filter((skin) => splitId(skin.id)[0] === id);
}

export function useChampionSkins(id) {
  const { skins } = useProps();
  return championSkins(id, skins);
}

export function skinlineSkins(id, skins, champions) {
  return Object.values(skins)
    .filter((skin) => skin.skinLines?.some((line) => line.id === id))
    .sort((a, b) => {
      const aId = splitId(a.id)[0];
      const bId = splitId(b.id)[0];
      const aIndex = champions.findIndex((c) => c.id === aId);
      const bIndex = champions.findIndex((c) => c.id === bId);
      return aIndex - bIndex;
    });
}

export function useSkinlineSkins(id) {
  const { skins, champions } = useProps();
  return skinlineSkins(id, skins, champions);
}

export const rarities = {
  kUltimate: ["ultimate.png", "终极"],
  kMythic: ["mythic.png", "神话"],
  kLegendary: ["legendary.png", "传说"],
  kEpic: ["epic.png", "史诗"],
};

export const classes = {
  assassin: "刺客",
  fighter: "战士",
  mage: "法师",
  marksman: "射手",
  support: "辅助",
  tank: "坦克",
};

export function rarity(skin) {
  if (!rarities[skin.rarity]) return null;
  const [imgName, name] = rarities[skin.rarity];
  const imgUrl = `${dataRoot()}/v1/rarity-gem-icons/${imgName}`;
  return [imgUrl, name];
}

export function modelviewerUrl(skin, champion) {
  return `https://www.modelviewer.lol/zh-CN/model-viewer?id=${skin.id}`;
  // const skinId = splitId(skin.id)[1];
  // return `https://teemo.gg/model-viewer?game=league-of-legends&type=champions&object=${champion.alias.toLowerCase()}&skinid=${champion.alias.toLowerCase()}-${skinId}`;
}

export function useLocalStorageState(name, initialValue) {
  const [value, _setValue] = useState(initialValue);
  useEffect(() => {
    localStorage[name] && _setValue(JSON.parse(localStorage[name]));
  }, [name]);

  const setValue = (v) => {
    _setValue(v);
    localStorage[name] = JSON.stringify(v);
  };
  return [value, setValue];
}

export function useSortedSkins(sortByRarity, skins) {
  if (sortByRarity) {
    const keys = Object.keys(rarities).reverse();
    return skins
      .slice()
      .sort((a, b) => keys.indexOf(b.rarity) - keys.indexOf(a.rarity));
  }

  return skins;
}

export function useEscapeTo(url) {
  const router = useRouter();
  useEffect(() => {
    function onKeyDown(e) {
      if (isTextBox(document.activeElement)) return; // Ignore events when an input is active.
      if (e.code === "Escape") {
        router.push(url, url);
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router, url]);
}

export function useArrowNavigation(left, right) {
  const handlers = useSwipeable({
    delta: 50,
    onSwipedLeft(e) {
      e.event.preventDefault();
      router.push(right, right);
    },
    onSwipedRight(e) {
      e.event.preventDefault();
      router.push(left, left);
    },
  });
  const router = useRouter();
  useEffect(() => {
    function onKeyDown(e) {
      if (isTextBox(document.activeElement)) return; // Ignore events when an input is active.
      if (e.key === "ArrowLeft") {
        router.push(left, left);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        router.push(right, right);
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router, left, right]);
  return handlers;
}

export function makeTitle(...pages) {
  let t = [...pages, "布锅锅联盟宇宙丨原画"].join(" · ");
  if (pages.length === 0) {
    t = "布锅锅联盟宇宙丨原画";
  }

  return (
    <>
      <title>{t}</title>;
      <meta property="og:title" content={t} />
    </>
  );
}

export function makeDescription(desc) {
  return (
    <>
      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
    </>
  );
}

export function makeCanonical(url) {
  const u = ROOT + url;
  return (
    <>
      <link rel="canonical" href={u} />
      <meta property="og:url" content={u} />
    </>
  );
}

export function makeImage(url, alt = null) {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content={url} />
      {alt && <meta property="og:image:alt" content={alt} />}
    </>
  );
}
