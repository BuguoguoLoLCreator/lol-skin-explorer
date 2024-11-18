import { useEffect } from "react";
import Head from "next/head";
import { useProps } from "../../data/contexts";
import styles from "../../styles/index.module.scss";
import Link from "next/link";
import { store } from "../../data/store";
import { Nav } from "../../components/nav";
import { Layout } from "../../components";
import {
  makeTitle,
  makeDescription,
  useArrowNavigation,
} from "../../data/helpers";
import { prepareAdditions } from "../../components/new-additions/helpers";

function SkinlinesList() {
  const { skinlines } = useProps();
  return (
    <div className={styles.skinlines}>
      {skinlines.map((l) => (
        <div key={l.id}>
          <Link
            href="/skinlines/[skinlineId]"
            as={`/skinlines/${l.id}`}
            prefetch={false}
          >
            <a>{l.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  useEffect(() => {
    localStorage.lastIndex = "/skinlines";
  }, []);
  const handlers = useArrowNavigation("/universes", "/");
  const { skinlines } = useProps();

  return (
    <>
      <Head>
        {makeTitle("皮肤系列")}
        {makeDescription(
          `在线浏览英雄联盟 ${skinlines.length} 个系列皮肤`
        )}
      </Head>
      <div {...handlers} className={styles.container}>
        <Nav active="skinlines" />
        <main>
          <SkinlinesList />
        </main>
      </div>
    </>
  );
}

Index.getLayout = (page) => <Layout withNew>{page}</Layout>;

export async function getStaticProps() {
  const { skinlines } = store.patch;

  return {
    props: {
      skinlines,
      patch: store.patch.fullVersionString,
      added: await prepareAdditions(),
    },
  };
}
