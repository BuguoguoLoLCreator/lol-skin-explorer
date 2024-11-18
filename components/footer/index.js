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
              <b>版本 {patch}</b>
            </a>
          </p>
        )}
        <p>
          <a
            target="_blank"
            href={`https://github.com/BuguoguoLoLCreator/lol-skin-explorer/tree/${
              process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "main"
            }`}
            style={{ textDecoration: "none" }}
            rel="noreferrer"
          >
            Skin Explorer v{publicRuntimeConfig?.version}
          </a>
          .{" "}中文分支{" "}
          <a
            target="_blank"
            href="https://github.com/BuguoguoLoLCreator"
            rel="noreferrer"
          >
            布锅锅联盟宇宙
          </a>
          {"("}
          <a
            target="_blank"
            href="https://github.com/BakaFT"
            rel="noreferrer"
          >
            @BakaFT
          </a>
          {" "}&{" "}
          <a
            target="_blank"
            href="https://github.com/Valhir"
            rel="noreferrer"
          >
            @Valhir
          </a>
          {")"}
          <br />
          原作者{" "}
          <a
            target="_blank"
            href="https://github.com/preyneyv"
            rel="noreferrer"
          >
            @preyneyv
          </a>
          .{" "}
          <a
            target="_blank"
            href="https://github.com/preyneyv/lol-skin-explorer"
            rel="noreferrer"
          >
            在GitHub中查看
          </a>
        </p>
      </div>
    </footer>
  );
}

export function FooterContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
