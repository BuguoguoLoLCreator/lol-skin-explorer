import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import classNames from "classnames";
import logo from "../../assets/logo.png";
import { Omnisearch } from "../omnisearch";
import { useEscapeTo } from "../../data/helpers";
import { ArrowLeft, ExternalLink, Menu, Search, X } from "lucide-react";
import { useLayoutEffect, useEffect, useRef, useState } from "react";

export const Header = ({ flat, backTo }) => {
  const back =
    typeof window !== "undefined" ? localStorage.lastIndex ?? backTo : backTo;
  useEscapeTo(back);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const omnisearch = useRef();
  (typeof window === "undefined" ? useEffect : useLayoutEffect)(() => {
    if (showSearch) omnisearch.current?.focus();
  }, [showSearch]);

  return (
    <>
      <header
        className={classNames(styles.header, {
          [styles.flat]: flat,
          [styles.search]: showSearch,
        })}
      >
        <Link href={back ?? "/"} as={back ?? "/"}>
          <a className={styles.logo}>
            {backTo && <ArrowLeft />}
            <Image
              priority
              src={logo}
              alt="Logo"
              height={36}
              width={178}
            />
          </a>
        </Link>
        <div className={styles.omnisearch}>
          <Omnisearch ref={omnisearch} />
        </div>
        <div
          className={styles.omnisearchIcon}
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          {showSearch ? <X /> : <Search />}
        </div>
        <div
          className={classNames(styles.menuIcon, { [styles.open]: menuOpen })}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
          <ul>
            <li>
              <Link href="/shortcuts">
                <a>快捷键与手势</a>
              </Link>
            </li>
            <li className={styles.divider} />
            <li>
              <Link href="/changelog" as="/changelog">
                <a>站点更新日志</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/about" as="/about">
                <a>About</a>
              </Link>
            </li> */}
            {/* <li>
              <Link href="/sponsor" as="/sponsor">
                <a>Sponsor</a>
              </Link>
            </li> */}
            <li className={styles.divider} />
            {/* <li>
              <a href="https://discord.gg" target="_blank" rel="noreferrer">
                Discord <ExternalLink />
              </a>
            </li> */}
            <li>
              <a
                href="https://buguoguo.cn"
                target="_blank"
                rel="noreferrer"
              >
                布锅锅联盟宇宙 <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://voice.buguoguo.cn"
                target="_blank"
                rel="noreferrer"
              >
                联盟宇宙丨语音 <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://buguoguo.cn"
                target="_blank"
                rel="noreferrer"
              >
                反馈BUG <ExternalLink />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div className={styles.headerSpacer} />
    </>
  );
};
