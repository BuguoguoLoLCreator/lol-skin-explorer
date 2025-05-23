import { useProps } from "../../data/contexts";
import Link from "next/link";
import Image from "../image";
import styles from "./style.module.scss";
import { asset } from "../../data/helpers";

export default function NewAdditions() {
  const { added } = useProps();

  if (!added.length) {
    return null;
  }

  const linkTo = (skin) => `/champions/${skin.$$key}/skins/${skin.id}`;

  return (
    <div className={styles.container}>
      <h3>最新皮肤</h3>
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {added.map((skin) => {
            return (
              <Link key={skin.id} href={linkTo(skin)} as={linkTo(skin)} className={styles.skin} passHref>
                <span className={styles.imageContainer}>
                  <Image fill
                    className={styles.tile}
                    unoptimized
                    loading="eager"
                    src={asset(skin.tilePath)}
                    alt={skin.name}
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <div>{skin.name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
