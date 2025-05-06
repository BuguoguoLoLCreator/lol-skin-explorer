import classNames from "classnames";
import { User, Globe, Folder } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/index.module.scss";

export function Nav({ active, filters }) {
  return (
    <nav>
      <div className={styles.tabs}>
        <Link href="/" as="/" className={classNames({ [styles.active]: active === "champions" })} passHref>
          <User />
          英雄
        </Link>
        <Link href="/universes" as="/universes" className={classNames({ [styles.active]: active === "universes" })} passHref>
          <Globe />
          宇宙
        </Link>
        <Link href="/skinlines" as="/skinlines" className={classNames({ [styles.active]: active === "skinlines" })} passHref>
          <Folder />
          皮肤系列
        </Link>
      </div>
      {filters && <div className={styles.filters}>{filters}</div>}
    </nav>
  );
}
