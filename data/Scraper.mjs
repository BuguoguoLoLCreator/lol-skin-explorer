import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// 常量定义
const CDRAGON = "https://communitydragon.buguoguo.cn";
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

// 从URL获取ColorfulSkin数据
async function fetchColorfulSkinData(url) {
  try {
    console.log(`[臻彩原画] 开始获取ColorfulSkin数据`);
    const { data } = await axios.get(url);
    // 利用正则表达式提取JSON部分
    const jsonMatch = data.match(/return\s+(\{[\s\S]*\});/);
    if (jsonMatch && jsonMatch[1]) {
      // 解析JSON数据
      const jsonStr = jsonMatch[1].replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      });
      return JSON.parse(jsonStr);
    }
    throw new Error('无法从ColorfulSkin URL提取JSON数据');
  } catch (error) {
    console.error('[臻彩原画] 获取ColorfulSkin数据失败:', error);
    return null;
  }
}

// 构建完整的图片URL
function buildImageUrl(instanceId, siteType) {
  return `https://game.gtimg.cn/images/lol/act/a20230715chromahub/skin/site${siteType}-${instanceId}.jpg`;
}

// 处理原始图片URL，确保它们是完整的URL
function processImageUrl(url) {
  if (!url) return '';
  // 如果URL以//开头，添加https:
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
}

// 获取臻彩原画数据
async function getPrestigeChromas() {
  try {
    console.log("[臻彩原画] 开始获取臻彩原画数据...");
    
    const champSelectUrl = "https://lol.ams.game.qq.com/lol/autocms/v1/content/LOL/LCU/ChampSelect";
    console.log(`[臻彩原画] 开始获取ChampSelect数据`);
    const { data: champSelectResponse } = await axios.get(champSelectUrl);
    
    if (!champSelectResponse || !champSelectResponse.chromaSkins) {
      throw new Error('无法获取chromaSkins数据');
    }
    
    const champSelectData = champSelectResponse;
    console.log(`[臻彩原画] 成功获取ChampSelect数据，发现 ${champSelectData.chromaSkins.length} 个臻彩原画`);
    
    const colorfulSkinUrl = "https://lol.qq.com/act/AutoCMS/publish/LOLAct/ColorfulSkin20230106/ColorfulSkin20230106.js";
    const colorfulSkinData = await fetchColorfulSkinData(colorfulSkinUrl);
    
    if (!colorfulSkinData) {
      throw new Error('无法解析ColorfulSkin数据');
    }
    
    console.log('[臻彩原画] 成功解析ColorfulSkin数据');
    
    // 构建skinId到instanceId的映射
    const skinIdToInstanceId = {};
    for (const key in colorfulSkinData) {
      const item = colorfulSkinData[key];
      if (item.skinId) {
        skinIdToInstanceId[item.skinId] = item.instanceId;
      }
    }
    
    // 合并数据
    const prestigeChromas = champSelectData.chromaSkins.map(skin => {
      const instanceId = skinIdToInstanceId[skin.id];
      return {
        emblemPath: processImageUrl(skin.emblemPath),
        skinId: skin.id,
        name: skin.name,
        splashPath: processImageUrl(skin.splashPath),
        // 如果找到了instanceId，则添加相应的图片URL
        ...(instanceId ? {
          uncenteredSplashPath: buildImageUrl(instanceId, '3'),
          loadScreenPath: buildImageUrl(instanceId, '5'),
          tilePath: buildImageUrl(instanceId, '5')
        } : {})
      };
    });
    
    // 为skinId 50022特殊处理，手动指定instanceId
    const specialSkinIndex = prestigeChromas.findIndex(skin => skin.skinId === 50022);
    if (specialSkinIndex !== -1) {
      const specialInstanceId = "d26f0e73-f4f3-481e-bb83-6f24ca824fa5";
      console.log(`[臻彩原画] 为水晶玫瑰 斯维因 蒂芙尼 50022 指定instanceId: ${specialInstanceId}`);
      prestigeChromas[specialSkinIndex] = {
        ...prestigeChromas[specialSkinIndex],
        uncenteredSplashPath: buildImageUrl(specialInstanceId, '3'),
        loadScreenPath: buildImageUrl(specialInstanceId, '5'),
        tilePath: buildImageUrl(specialInstanceId, '4')
      };
    }
    
    console.log(`[臻彩原画] 成功合并数据，共 ${prestigeChromas.length} 个臻彩原画`);
    return prestigeChromas;
  } catch (error) {
    console.error('[臻彩原画] 获取数据失败:', error);
    return [];
  }
}

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

    // 获取臻彩原画数据
    const prestigeChromas = await getPrestigeChromas();

    // 保存到本地文件
    await Promise.all([
      // 保存PBE数据
      localCache.set("champions", champions),
      localCache.set("skinlines", skinlines),
      localCache.set("skins", skins),
      localCache.set("universes", universes),
      // 保存新增数据
      localCache.set("added", added),
      // 保存臻彩原画数据
      localCache.set("prestigechromas", prestigeChromas)
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