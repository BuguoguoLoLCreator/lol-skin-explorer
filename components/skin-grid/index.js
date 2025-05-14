import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { asset, rarity } from "../../data/helpers";
import styles from "./styles.module.scss";

export function SkinGrid({ skins, linkTo }) {
  if (skins.length === 0)
    return (
      <div className={styles.grid} style={{ gridTemplateColumns: "1fr" }}>
        <span className={styles.error}>暂无皮肤！</span>
      </div>
    );
  return (
    <div className={styles.grid}>
      {skins.map((skin) => {
        const r = rarity(skin);
        return (
          <Link key={skin.id} href={linkTo(skin)} as={linkTo(skin)} passHref>
            <span className={styles.imageContainer}>
              <Image fill
                className={styles.tile}
                unoptimized
                src={asset(skin.tilePath)}
                alt={skin.name}
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </span>
            <div>
              <span className={styles.skinName}>{skin.name}</span>
              <div className={classNames({ [styles.rarityBadge]: r })}>
                {r && (
                  <Image
                    src={r[0]}
                    title={r[1]}
                    alt={r[1]}
                    style={{ objectFit: "contain", objectPosition: "center" }}
                    height={20}
                    width={20}
                  />
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
