import { useEffect } from "react";
import Head from "next/head";
import { useProps } from "../../data/contexts";
import styles from "../../styles/collection.module.scss";
import { store } from "../../data/store";
import { SkinGrid } from "../../components/skin-grid";
import {
  makeTitle,
  makeDescription,
  useArrowNavigation,
  useLocalStorageState,
} from "../../data/helpers";
import Image from "next/image";
import { Header } from "../../components/header";
import { Footer, FooterContainer } from "../../components/footer";
import { Palette } from "lucide-react";
import { Fallback } from "../../components/fallback";
import {
  asset,
  makeImage,
} from "../../data/helpers";

function extractIdsFromSkinId(skinId) {
  const skinIdStr = String(skinId);
  const championId = skinIdStr.length > 3 ? skinIdStr.slice(0, -3) : skinIdStr;
  const skinNum = skinIdStr.length > 3 ? skinIdStr.slice(-3) : "000";
  
  return { championId: parseInt(championId), skinNum: parseInt(skinNum) };
}

function ChampionSection({ champion, skins }) {
  return (
    <>
      <h2 className={styles.groupTitle}>
        <div>
          {champion.name}
        </div>
      </h2>
      <SkinGrid
        skins={skins}
        linkTo={(skin) => `/prestigechromas/${skin.skinId}`}
      />
    </>
  );
}

function _Page() {
  const { prestigeChromasByChampion, championData } = useProps();
  const [sortBy, setSortBy] = useLocalStorageState(
    "prestigechromas__sortBy",
    "championId"
  );

  const targetSkinId = 103031;
  let splash = null;
  
  Object.values(prestigeChromasByChampion).forEach(skins => {
    const foundSkin = skins.find(skin => skin.skinId === targetSkinId);
    if (foundSkin) {
      splash = asset(foundSkin.splashPath);
    }
  });

  if (!splash) {
    const firstChampId = Object.keys(prestigeChromasByChampion)[0];
    const firstSkin = firstChampId ? prestigeChromasByChampion[firstChampId][0] : null;
    splash = firstSkin ? asset(firstSkin.splashPath) : null;
  }

  // 根据排序方式对英雄ID进行排序
  const sortedChampionIds = Object.keys(prestigeChromasByChampion).sort((a, b) => {
    if (sortBy === "championId") {
      // 按英雄ID从小到大排序
      return parseInt(a) - parseInt(b);
    } else if (sortBy === "skinCount") {
      // 按臻彩数量从多到少排序
      const countA = prestigeChromasByChampion[a].length;
      const countB = prestigeChromasByChampion[b].length;
      return countB - countA;
    }
    return 0;
  });

  return (
    <>
      <Head>
        {makeTitle("臻彩原画")}
        {makeDescription("浏览英雄联盟臻彩原画")}
        {splash && makeImage(splash, "臻彩原画")}
      </Head>
      <div className={styles.container}>
        <FooterContainer>
          <div>
            {splash && (
              <div className={styles.background}>
                <Image fill
                  unoptimized
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  src={splash}
                  alt="臻彩原画背景"
                />
              </div>
            )}
            <Header backTo="/" flat />
            <main>
              <h2 className={styles.subtitle}>
                <Palette />
                臻彩
              </h2>
              <h1 className={styles.title}>臻彩原画</h1>
              <p className={styles.description}>
                浏览英雄联盟臻彩原画
              </p>

              <div className={styles.controls}>
                <label>
                  <span>排序方式</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="championId">英雄</option>
                    <option value="skinCount">数量</option>
                  </select>
                </label>
              </div>

              {sortedChampionIds.map((champId) => (
                <ChampionSection
                  key={champId}
                  champion={championData[champId]}
                  skins={prestigeChromasByChampion[champId]}
                />
              ))}
            </main>
          </div>
          <Footer flat />
        </FooterContainer>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Fallback>
      <_Page />
    </Fallback>
  );
}

export async function getStaticProps() {
  const { prestigeChromas, champions } = store.patch;
  const updateTime = store.getLastUpdateTime();

  // 按英雄ID分组臻彩原画
  const prestigeChromasByChampion = {};
  const championData = {};
  
  prestigeChromas.forEach(skin => {
    // 从skinId提取英雄ID和皮肤序号
    const { championId, skinNum } = extractIdsFromSkinId(skin.skinId);
    const champIdKey = championId.toString();
    
    // 初始化该英雄的数组（如果不存在）
    if (!prestigeChromasByChampion[champIdKey]) {
      prestigeChromasByChampion[champIdKey] = [];
      
      // 查找并存储英雄信息
      const champion = champions.find(c => c.id === championId);
      championData[champIdKey] = {
        id: championId,
        name: champion ? `${champion.name} ${champion.description}` : ``
      };
    }
    
    // 添加皮肤到对应英雄的数组中
    prestigeChromasByChampion[champIdKey].push({
      ...skin,
      id: skin.skinId, // 添加id字段以兼容SkinGrid组件
      skinNum: skinNum // 添加skinNum字段以便后续使用
    });
  });

  return {
    props: {
      prestigeChromasByChampion,
      championData,
      patch: store.patch.fullVersionString,
      updateTime,
    },
  };
} 