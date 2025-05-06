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
        <Link href={back ?? "/"} as={back ?? "/"} className={styles.logo} passHref>
          {backTo && <ArrowLeft />}
          <Image
            priority
            src={logo}
            alt="Logo"
            height={36}
            width={178}
          />
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
                使用帮助
              </Link>
            </li>
            <li>
              <Link href="/changelog" as="/changelog">
                更新日志
              </Link>
            </li>
            <li className={styles.divider} />
            <li>
              <a
                href="https://voice.buguoguo.cn/#/privacy"
                target="_blank"
                rel="noreferrer"
              >
                隐私条款 <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://voice.buguoguo.cn/#/terms"
                target="_blank"
                rel="noreferrer"
              >
                使用条款 <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://voice.buguoguo.cn/#/about"
                target="_blank"
                rel="noreferrer"
              >
                关于我们 <ExternalLink />
              </a>
            </li>
            <li className={styles.divider} />
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
                href="https://3d.buguoguo.cn"
                target="_blank"
                rel="noreferrer"
              >
                联盟宇宙丨模型 <ExternalLink />
              </a>
            </li>
            <li>
              <a
                href="https://buguoguo.cn/sites/skinexplorer.html"
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
