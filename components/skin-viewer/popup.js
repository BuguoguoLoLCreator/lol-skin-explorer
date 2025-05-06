import {
  Box,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Folder,
  Globe,
  Mic,
  Palette,
  User,
  Video,
} from "lucide-react";
import Image from "../image";
import Link from "next/link";
import { asset } from "../../data/helpers";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export function Popup({ skin }) {
  const [showChromas, setShowChromas] = useState(false);
  useEffect(() => {
    setShowChromas(false);
  }, [skin]);
  const meta = skin.$skinExplorer;
  return (
    <aside className={styles.popup} onTouchStart={(e) => e.stopPropagation()}>
      <nav>
        <div>
          <User />
          <Link href="/champions/[key]" as={`/champions/${meta.champion.key}`} passHref>
            <span>{meta.champion.name}</span>
          </Link>
        </div>
        {!!meta.universes.length && (
          <div>
            <Globe />
            {meta.universes.map((u) => (
              <Link key={u.id} href="/universes/[id]" as={`/universes/${u.id}`} passHref>
                <span>{u.name}</span>
              </Link>
            ))}
          </div>
        )}
        {!!meta.skinlines.length && (
          <div>
            <Folder />
            {meta.skinlines.map((l) => (
              <Link key={l.id} href="/skinlines/[id]" as={`/skinlines/${l.id}`} passHref>
                <span>{l.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
      {skin.description && (
        <p dangerouslySetInnerHTML={{ __html: skin.description }} />
      )}
      {skin.chromas && (
        <>
          <h3 onClick={() => setShowChromas(!showChromas)}>
            <span>
              <Palette /> {skin.chromas.length + 1} 个炫彩外观
            </span>
            {showChromas ? <ChevronUp /> : <ChevronDown />}
          </h3>
          {showChromas && (
            <div className={styles.chromas}>
              {[skin, ...skin.chromas].map((chroma) => (
                <div key={chroma.id}>
                  <a
                    href={asset(chroma.chromaPath)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image fill
                      loading="eager"
                      unoptimized
                      src={asset(chroma.chromaPath)}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                      alt={skin.name}
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <a href={`https://voice.buguoguo.cn/#/voice/${meta.champion.id}`} target="_blank" rel="noreferrer">
        <h3>
          <span>
            <Mic />
            去语音站收听{meta.champion.name}的语音
          </span>
          <ExternalLink />
        </h3>
      </a>
      <a href={meta.skinVideoUrl} target="_blank" rel="noreferrer">
        <h3>
          <span>
            <Video />
            去哔哩哔哩查看该皮肤演示视频
          </span>
          <ExternalLink />
        </h3>
      </a>
      <a href={meta.modelviewerUrl} target="_blank" rel="noreferrer">
        <h3>
          <span>
            <Box />
            去卡达查看{meta.champion.name}的3D模型
          </span>
          <ExternalLink />
        </h3>
      </a>
    </aside>
  );
}
