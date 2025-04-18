import classNames from "classnames";
import { User, Globe, Folder } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/index.module.scss";

export function Nav({ active, filters }) {
  return (
    <nav>
      <div className={styles.tabs}>
        <Link href="/" as="/">
          <a
            className={classNames({
              [styles.active]: active === "champions",
            })}
          >
            <User />
            英雄
          </a>
        </Link>
        <Link href="/universes" as="/universes">
          <a
            className={classNames({
              [styles.active]: active === "universes",
            })}
          >
            <Globe />
            宇宙
          </a>
        </Link>
        <Link href="/skinlines" as="/skinlines">
          <a
            className={classNames({
              [styles.active]: active === "skinlines",
            })}
          >
            <Folder />
            皮肤系列
          </a>
        </Link>
      </div>
      {filters && <div className={styles.filters}>{filters}</div>}
    </nav>
  );
}
