import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import classNames from "classnames";
import logo from "../../assets/logo.png";
import { Omnisearch } from "../omnisearch";
import { useEscapeTo } from "../../data/helpers";
import { ArrowLeft, ExternalLink, Menu } from "react-feather";
import { useState } from "react";

export const Header = ({ flat, backTo }) => {
  const back =
    typeof window !== "undefined" ? localStorage.lastIndex ?? backTo : backTo;
  useEscapeTo(back);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={classNames(styles.header, { [styles.flat]: flat })}>
        <Link href={back ?? "/"}>
          <a className={styles.logo}>
            {backTo && <ArrowLeft />}
            <Image
              priority
              src={logo}
              alt="Skin Explorer"
              height={36}
              width={178}
            />
          </a>
        </Link>
        <div className={styles.omnisearch}>
          <Omnisearch />
        </div>
        <div
          className={classNames(styles.menuIcon, { [styles.open]: menuOpen })}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
          <ul>
            <li>
              <Link href="/keyboard">
                <a>Keyboard Shortcuts</a>
              </Link>
            </li>
            <li>
              <Link href="/changelog">
                <a>Changelog</a>
              </Link>
            </li>
            <li className={styles.divider} />
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/sponsor">
                <a>Sponsor</a>
              </Link>
            </li>
            <li className={styles.divider} />
            {/* <li>
              <a href="https://discord.gg" target="_blank" rel="noreferrer">
                Discord <ExternalLink />
              </a>
            </li> */}
            <li>
              <a
                href="https://analytics.skinexplorer.lol/share/JlbPP3v4/Skin%20Explorer"
                target="_blank"
                rel="noreferrer"
              >
                Analytics <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/preyneyv/lol-skin-explorer/issues/new/choose"
                target="_blank"
                rel="noreferrer"
              >
                Bug Report <ExternalLink />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
};
