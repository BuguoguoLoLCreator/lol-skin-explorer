import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fallback } from "../../../components/fallback";
import { Footer, FooterContainer } from "../../../components/footer";
import { useProps } from "../../../data/contexts";
import { Header } from "../../../components/header";
import { SkinGrid } from "../../../components/skin-grid";
import {
  asset,
  makeDescription,
  makeImage,
  makeTitle,
  skinlineSkins,
  useLocalStorageState,
  useSortedSkins,
} from "../../../data/helpers";
import { store } from "../../../data/store";
import styles from "../../../styles/collection.module.scss";
import { Folder, Globe } from "lucide-react";

function _Page() {
  const { skinline, universes, skins } = useProps();
  const [sortBy, setSortBy] = useLocalStorageState(
    "skinline__sortBy",
    "champion"
  );

  const linkTo = (skin) => `/skinlines/${skinline.id}/skins/${skin.id}`;

  const sortedSkins = useSortedSkins(sortBy === "rarity", skins);
  const splash = skins.length > 0 && asset(skins[0].uncenteredSplashPath);

  return (
    <>
      <Head>
        {makeTitle(skinline.name)}
        {makeDescription(
          `浏览全部 ${skins.length} 个${
            skins.length == 1 ? "" : "s"
          } 归属于 ${skinline.name} 系列的皮肤`
        )}
        {splash && makeImage(splash, skinline.name)}
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
                  alt={skinline.name}
                />
              </div>
            )}
            <Header backTo="/skinlines" flat />
            <main>
              <h2 className={styles.subtitle}>
                <Folder />
                皮肤系列
              </h2>
              <h1 className={styles.title}>{skinline.name}</h1>
              {!!universes.length && (
                <div className={styles.parents}>
                  <Link
                    key={universes[0].id}
                    href="/universes/[universeId]"
                    as={`/universes/${universes[0].id}`}
                    prefetch={false}
                    passHref
                  >
                    <Globe />
                    <span>该皮肤系列归属于 {universes[0].name} 宇宙</span>
                  </Link>
                </div>
              )}
              <div className={styles.controls}>
                <label>
                  <span>排序方式</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="champion">英雄</option>
                    <option value="rarity">稀有度</option>
                  </select>
                </label>
              </div>
              <SkinGrid
                skins={sortedSkins}
                linkTo={linkTo}
                viewerPage="/skinlines/[lId]/skins/[sId]"
              />
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

export async function getStaticProps(ctx) {
  const { skinlineId } = ctx.params;

  const {
    champions,
    skinlines,
    universes: allUniverses,
    skins: allSkins,
  } = store.patch;
  const updateTime = store.getLastUpdateTime();

  const skinline = skinlines.find((l) => l.id.toString() == skinlineId);
  if (!skinline) {
    return {
      notFound: true,
    };
  }

  const skins = skinlineSkins(skinline.id, allSkins, champions);
  const universes = allUniverses.filter((u) =>
    u.skinSets.includes(skinline.id)
  );

  return {
    props: {
      skinline,
      skins,
      universes,
      patch: store.patch.fullVersionString,
      updateTime,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];
  if (process.env.NODE_ENV === "production") {
    const { skinlines } = store.patch;
    paths = skinlines.map((l) => ({ params: { skinlineId: l.id.toString() } }));
  }

  return {
    paths,
    fallback: true,
  };
}
