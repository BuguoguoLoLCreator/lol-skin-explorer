import React, { useImperativeHandle } from "react";
import Image from "../image";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { asset } from "../../data/helpers";
import classNames from "classnames";
import styles from "./styles.module.scss";
import axios from "axios";

export const Omnisearch = React.forwardRef(({}, ref) => {
  const inp = useRef();
  const router = useRouter();
  useImperativeHandle(
    ref,
    () => ({
      focus: () => inp.current?.focus(),
    }),
    []
  );

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("/api/omnisearch", { params: { query } })
      .then((res) => setMatches(res.data));
  }, [query]);

  useEffect(() => setSelected(0), [query]);

  function onSelect(entity) {
    const { type } = entity;
    let route;
    if (type === "champion") {
      route = `/champions/${entity.key}`;
    }
    if (type === "skinline") {
      route = `/skinlines/${entity.id}`;
    }
    if (type === "universe") {
      route = `/universes/${entity.id}`;
    }
    if (type === "skin") {
      route = `/champions/${entity.key}/skins/${entity.id}`;
    }
    if (type === "prestigechroma") {
      route = `/prestigechromas/${entity.id}`;
    }

    if (route) {
      router.push(route, route);
    }
  }

  function selectActive() {
    onSelect(matches[selected]);
    setQuery("");
  }

  useEffect(() => {
    function onKeyDown() {
      if (document.activeElement === document.body) {
        inp.current?.focus();
      }
    }
    document.addEventListener("keypress", onKeyDown);
    return () => document.removeEventListener("keypress", onKeyDown);
  });
  return (
    <div className={styles.search}>
      <input
        ref={inp}
        type="search"
        placeholder="搜索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            setSelected((selected + 1) % matches.length);
            e.preventDefault();
          }
          if (e.key === "ArrowUp") {
            setSelected((selected === 0 ? matches.length : selected) - 1);
            e.preventDefault();
          }
          if (e.key === "Enter" && matches.length) {
            selectActive();
            e.preventDefault();
            e.target.blur();
          }
        }}
      />
      {showResults && matches.length !== 0 && (
        <ul>
          {matches.map((match, i) => (
            <li
              onMouseEnter={() => setSelected(i)}
              onMouseDown={selectActive}
              className={classNames({
                [styles.selected]: selected === i,
              })}
              key={i}
            >
              {match.image && (
                <div className={styles.image}>
                  <Image
                    unoptimized
                    src={asset(match.image)}
                    alt={match.name}
                    width={36}
                    height={36}
                  />
                </div>
              )}
              <div>
                <div>{match.name}</div>
                {match.type === "champion" ? (
                  <span>英雄</span>
                ) : match.type === "skinline" ? (
                  <span>皮肤系列</span>
                ) : match.type === "universe" ? (
                  <span>宇宙</span>
                ) : match.type === "prestigechroma" ? (
                  <span>臻彩原画</span>
                ) : (
                  <span>皮肤</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
Omnisearch.displayName = "Omnisearch";
