import classNames from "classnames";
import styles from "./styles.module.scss";
import { useProps } from "../../data/contexts";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export function Footer({ flat }) {
  const { patch } = useProps();
  return (
    <footer className={classNames(styles.footer, { [styles.flat]: flat })}>
      <div>
        <p>
        游戏内数据来自于{" "}
          <a
            target="_blank"
            href="https://communitydragon.org"
            rel="noreferrer"
          >
            CommunityDragon
          </a>{" "}
          和{" "}
          <a
            target="_blank"
            href="https://leagueoflegends.fandom.com/"
            rel="noreferrer"
          >
            League of Legends Wiki
          </a>
          。
        </p>
        <p>
        BuguoguoLoLCreator was created under Riot Games&apos;{" "}
          <a
            target="_blank"
            href="https://www.riotgames.com/en/legal"
            rel="noreferrer"
          >
            &quot;Legal Jibber Jabber&quot;
          </a>{" "}
          policy using assets owned by Riot Games. Riot Games does not endorse
          or sponsor this project.
        </p>
      </div>
      <div>
        {patch && (
          <p>
            <a
              href="https://communitydragon.buguoguo.cn/pbe/"
              target="_blank"
              style={{ textDecoration: "none" }}
              rel="noreferrer"
            >
              <b>游戏版本 {patch}</b>
            </a>
          </p>
        )}
        <p>
          <a
            target="_blank"
            href={`https://github.com/BuguoguoLoLCreator/lol-skin-explorer`}
            style={{ textDecoration: "none" }}
            rel="noreferrer"
          >
            Skin Explorer v{publicRuntimeConfig?.version}
          </a>
          {" "}
          <a
            target="_blank"
            href="https://github.com/BuguoguoLoLCreator"
            rel="noreferrer"
          >
            布锅锅联盟宇宙
          </a>
          {"&"}
          <a
            target="_blank"
            href="https://github.com/preyneyv"
            rel="noreferrer"
          >
            @preyneyv
          </a>
        </p>
      </div>
    </footer>
  );
}

export function FooterContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
