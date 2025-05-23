import { useEffect } from "react";
import Head from "next/head";
import { useProps } from "../../data/contexts";
import styles from "../../styles/index.module.scss";
import Link from "next/link";
import { store } from "../../data/store";
import { Nav } from "../../components/nav";
import { Layout } from "../../components";
import {
  makeDescription,
  makeTitle,
  useArrowNavigation,
} from "../../data/helpers";
import { prepareAdditions } from "../../components/new-additions/helpers";

function UniversesList() {
  const { universes, skinlines } = useProps();
  return (
    <div className={styles.universes}>
      {universes.map((u) => {
        const skinSets = u.skinSets
          .map((id) => ({
            id,
            name: skinlines.find((s) => s.id === id).name,
          }))
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        return (
          <div key={u.id}>
            <Link
              href="/universes/[universeId]"
              as={`/universes/${u.id}`}
              prefetch={false}
            >
              {u.name}
            </Link>
            {(skinSets.length > 1 || skinSets[0].name !== u.name) && (
              <ul>
                {skinSets.map(({ name, id }) => (
                  <li key={id}>
                    <Link
                      href="/skinlines/[skinlineId]"
                      as={`/skinlines/${id}`}
                      prefetch={false}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Index() {
  useEffect(() => {
    localStorage.lastIndex = "/universes";
  }, []);

  const handlers = useArrowNavigation("/", "/skinlines");

  const { universes } = useProps();

  return (
    <>
      <Head>
        {makeTitle("宇宙")}
        {makeDescription(
          `在线浏览 ${universes.length} 个宇宙！`
        )}
      </Head>
      <div {...handlers} className={styles.container}>
        <Nav active="universes" />
        <main>
          <UniversesList />
        </main>
      </div>
    </>
  );
}

Index.getLayout = (page) => <Layout withNew>{page}</Layout>;

export async function getStaticProps() {
  const { universes, skinlines } = store.patch;

  return {
    props: {
      universes: universes.filter((u) => u.skinSets.length),
      skinlines,
      patch: store.patch.fullVersionString,
      added: await prepareAdditions(),
    },
  };
}
