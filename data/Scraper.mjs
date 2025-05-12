import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// 常量定义
const CDRAGON = "https://communitydragon.buguoguo.cn";
const SKIN_SCRAPE_INTERVAL = 3600; // 1小时
const SUBSTITUTIONS = {
  monkeyking: "wukong",
};

// 构建本地缓存路径
const cachePath = resolve(dirname(fileURLToPath(import.meta.url)), ".cache");

// 数据URL构建函数
const dataURL = (p, patch = "pbe") => {
  const timestamp = Date.now();
  return `${CDRAGON}/${patch}/plugins/rcp-be-lol-game-data/global/zh_cn${p}?t=${timestamp}`;
};

const dataURLDefault = (p) => {
  const timestamp = Date.now();
  return `${CDRAGON}/pbe/plugins/rcp-be-lol-game-data/global/default${p}?t=${timestamp}`;
};

const substitute = (thing) => SUBSTITUTIONS[thing] ?? thing;

// 本地缓存操作
const localCache = {
  async get(key, initial = null) {
    try {
      const data = await fs.readFile(path.resolve(cachePath, `${key}.json`), "utf8");
      return JSON.parse(data);
    } catch (error) {
      return initial;
    }
  },

  async set(key, value) {
    await fs.writeFile(path.resolve(cachePath, `${key}.json`), JSON.stringify(value));
  }
};

// 获取最新英雄数据
async function getLatestChampions(patch = "pbe") {
  const { data } = await axios.get(dataURL("/v1/champion-summary.json", patch));
  console.log(`[CDragon] [${patch}] 英雄数据(zh_CN)加载完成`);
  return data
    .filter((d) => d.id !== -1)
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((a) => ({ ...a, key: substitute(a.alias.toLowerCase()) }));
}

// 获取最新宇宙数据
async function getLatestUniverses(patch = "pbe") {
  const { data } = await axios.get(dataURL("/v1/universes.json", patch));
  console.log(`[CDragon] [${patch}] 宇宙数据(zh_CN)加载完成`);
  return data
    .filter((d) => d.id !== 0)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

// 获取最新皮肤系列
async function getLatestSkinlines(patch = "pbe") {
  const { data } = await axios.get(dataURL("/v1/skinlines.json", patch));
  console.log(`[CDragon] [${patch}] 皮肤系列(zh_CN)加载完成`);
  return data
    .filter((d) => d.id !== 0)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

// 获取最新皮肤数据(中文)
async function getLatestSkins(patch = "pbe") {
  const { data } = await axios.get(dataURL("/v1/skins.json", patch));  
  console.log(`[CDragon] [${patch}] 皮肤数据(zh_CN)加载完成`);

  Object.keys(data).map((id) => {
    const skin = data[id];
    if (skin.questSkinInfo) {
      const base = { ...skin };
      delete base.questSkinInfo;

      skin.questSkinInfo.tiers.map((tier) => {
        const s = { ...base, ...tier };
        data[s.id.toString()] = s;
      });
    }
  });
  return data;
}

// 获取最新皮肤数据(英文)
async function getLatestSkinsDefault(patch = "pbe") {
  const { data } = await axios.get(dataURLDefault("/v1/skins.json", patch));  
  console.log(`[CDragon] [${patch}] 皮肤数据(en_US)加载完成`);

  Object.keys(data).map((id) => {
    const skin = data[id];
    if (skin.isBase) {
      skin.name = "Original " + skin.name;
    }
    if (skin.questSkinInfo) {
      const base = { ...skin };
      delete base.questSkinInfo;

      skin.questSkinInfo.tiers.map((tier) => {
        const s = { ...base, ...tier };
        data[s.id.toString()] = s;
      });
    }
  });
  return data;
}

// 获取最新补丁数据
async function getLatestPatchData(patch = "pbe") {
  return await Promise.all([
    getLatestChampions(patch),
    getLatestSkinlines(patch),
    getLatestSkins(patch),
    getLatestUniverses(patch),
    getLatestSkinsDefault(patch),
  ]);
}

// 获取新增数据
async function getAdded(pbeChampions, pbeSkinlines, pbeSkins, pbeUniverses, latestChampions, latestSkinlines, latestSkins, latestUniverses) {
  try {
    console.log("[新增信息] 开始分析PBE相比Latest的新增内容...");
    
    // 创建latest数据中各种ID的集合，用于后续对比
    const latestSkinIds = new Set(Object.keys(latestSkins)),
      latestChampionIds = new Set(latestChampions.map((c) => c.id)),
      latestSkinlineIds = new Set(latestSkinlines.map((l) => l.id)),
      latestUniverseIds = new Set(latestUniverses.map((u) => u.id));

    // 找出PBE数据中存在但Latest数据中不存在的ID，这些就是新增内容
    const added = {
      // 过滤出PBE中有但Latest中没有的皮肤ID
      skins: Object.keys(pbeSkins).filter((i) => !latestSkinIds.has(i)),
      // 过滤出PBE中有但Latest中没有的英雄ID
      champions: pbeChampions.map((c) => c.id).filter((i) => !latestChampionIds.has(i)),
      // 过滤出PBE中有但Latest中没有的皮肤系列ID
      skinlines: pbeSkinlines.map((l) => l.id).filter((i) => !latestSkinlineIds.has(i)),
      // 过滤出PBE中有但Latest中没有的宇宙ID
      universes: pbeUniverses.map((u) => u.id).filter((i) => !latestUniverseIds.has(i)),
    };
    
    console.log(`[新增信息] 对比完成: 相比Latest版本，PBE新增皮肤 ${added.skins.length} 个，新增英雄 ${added.champions.length} 个，新增皮肤系列 ${added.skinlines.length} 个，新增宇宙 ${added.universes.length} 个`);
    return added;
  } catch (error) {
    console.log("[新增信息] 分析新增内容出错，返回空对象", error);
    return {
      skins: [],
      champions: [],
      skinlines: [],
      universes: []
    };
  }
}

// 主函数 - 直接获取数据并保存
async function main() {
  try {
    console.log("[版本数据更新] 开始更新数据...");
    
    // 确保缓存目录存在
    await fs.mkdir(cachePath, { recursive: true });
    
    const persistentVars = await localCache.get("persistentVars", {
      lastUpdate: 0,
      oldVersionString: ""
    });
    
    const now = Date.now();
    
    // PBE数据变量
    let champions, skinlines, skins, universes, skinsDefault;
    // Latest数据变量，仅用于对比，不会保存
    let latestChampions, latestSkinlines, latestSkins, latestUniverses, latestSkinsDefault;

    // 获取元数据信息
    const timestamp = Date.now();
    const metadata = (await axios.get(`${CDRAGON}/pbe/content-metadata.json?t=${timestamp}`)).data;
    
    // 不管版本是否变更，始终获取最新数据
    console.log("[CDragon] 开始获取PBE和Latest的数据");
    
    // 获取PBE数据（测试服数据，包含最新内容）
    [champions, skinlines, skins, universes, skinsDefault] = await getLatestPatchData("pbe");
    console.log("[CDragon] PBE数据获取完成");
    
    // 获取Latest数据（正式服数据，不包含未发布内容）
    console.log("[CDragon] 开始获取Latest数据");
    [latestChampions, latestSkinlines, latestSkins, latestUniverses, latestSkinsDefault] = await getLatestPatchData("latest");
    console.log("[CDragon] Latest数据获取完成");
    
    // 计算新增内容：比较PBE与Latest数据，找出PBE中有但Latest中没有的内容
    const added = await getAdded(champions, skinlines, skins, universes, latestChampions, latestSkinlines, latestSkins, latestUniverses);

    // 保存到本地文件
    await Promise.all([
      // 保存PBE数据
      localCache.set("champions", champions),
      localCache.set("skinlines", skinlines),
      localCache.set("skins", skins),
      localCache.set("universes", universes),
      // 保存新增数据
      localCache.set("added", added),
    ]);
    
    // 更新持久化变量
    await localCache.set("persistentVars", {
      lastUpdate: now,
      oldVersionString: metadata.version,
    });

    console.log("[版本数据更新] 数据更新完成");
  } catch (error) {
    console.error("[版本数据更新] 发生错误:", error);
    process.exit(1);
  }
}

// 执行主函数
main(); 