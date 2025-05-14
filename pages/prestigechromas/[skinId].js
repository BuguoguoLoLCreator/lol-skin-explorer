import { Palette  } from "lucide-react";
import { SkinViewer } from "../../components/skin-viewer";
import { prepareCollection } from "../../components/skin-viewer/helpers";
import { useProps } from "../../data/contexts";
import { store } from "../../data/store";

// 从skinId提取championId和skinNum
function extractIdsFromSkinId(skinId) {
  const skinIdStr = String(skinId);
  const championId = skinIdStr.length > 3 ? skinIdStr.slice(0, -3) : skinIdStr;
  const skinNum = skinIdStr.length > 3 ? skinIdStr.slice(-3) : "000";
  
  return { championId: parseInt(championId), skinNum: parseInt(skinNum) };
}

export default function Page() {
  const { skin, prev, next } = useProps();
  return (
    <SkinViewer
      backTo="/prestigechromas"
      linkTo={(s) => `/prestigechromas/${s.id}`}
      collectionName="臻彩原画"
      collectionIcon={<Palette />}
      collectionPage="/prestigechromas"
      {...{ skin, prev, next }}
    />
  );
}

export async function getStaticProps(ctx) {
  const { skinId } = ctx.params;

  const { prestigeChromas, champions } = store.patch;
  const updateTime = store.getLastUpdateTime();

  // 找到当前皮肤
  const currentSkin = prestigeChromas.find(
    (s) => s.skinId.toString() === skinId
  );
  if (!currentSkin) {
    return {
      notFound: true,
    };
  }

  // 提取当前皮肤的英雄ID
  const { championId } = extractIdsFromSkinId(currentSkin.skinId);

  // 找到同一英雄的所有臻彩原画
  const sameChampionSkins = prestigeChromas.filter((skin) => {
    const { championId: skinChampId } = extractIdsFromSkinId(skin.skinId);
    return skinChampId === championId;
  });

  // 为所有皮肤添加id字段以兼容SkinViewer组件
  const preparedSkins = sameChampionSkins.map(skin => {
    // 创建皮肤的基本数据结构
    const preparedSkin = {
      ...skin,
      id: skin.skinId
    };
    
    if (!preparedSkin.splashPath && preparedSkin.uncenteredSplashPath) {
      preparedSkin.splashPath = preparedSkin.uncenteredSplashPath;
    }
    
    if (!preparedSkin.uncenteredSplashPath && preparedSkin.splashPath) {
      preparedSkin.uncenteredSplashPath = preparedSkin.splashPath;
    }
    
    return preparedSkin;
  });

  // 找到当前皮肤在列表中的位置
  const currentIdx = preparedSkins.findIndex(
    (s) => s.id.toString() === skinId
  );
  if (currentIdx === -1) {
    return {
      notFound: true,
    };
  }

  const { skin, prev, next } = await prepareCollection(preparedSkins, currentIdx);

  // 再次检查结果，确保skin、prev和next都有必要的URL
  // 如果缺少，则从其他字段中补充
  const ensureUrls = (skinObj) => {
    if (!skinObj) return skinObj;
    
    if (!skinObj.splashPath && skinObj.uncenteredSplashPath) {
      skinObj.splashPath = skinObj.uncenteredSplashPath;
    }
    
    if (!skinObj.uncenteredSplashPath && skinObj.splashPath) {
      skinObj.uncenteredSplashPath = skinObj.splashPath;
    }
    
    return skinObj;
  };
  
  return {
    props: {
      skin: ensureUrls(skin),
      prev: prev ? ensureUrls(prev) : null,
      next: next ? ensureUrls(next) : null,
      patch: store.patch.fullVersionString,
      updateTime,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];
  if (process.env.NODE_ENV === "production") {
    const { prestigeChromas } = store.patch;
    paths = prestigeChromas.map((skin) => ({
      params: { skinId: skin.skinId.toString() },
    }));
  }

  return {
    paths,
    fallback: "blocking",
  };
} 