import { Header } from "./header";
import { Footer, FooterContainer } from "./footer";
import { NewAdditions } from "./new-additions";
import dynamic from "next/dynamic";
import { store } from "../data/store";

const LazyNewAdditions = dynamic(() => import("./new-additions"), {
  ssr: false,
});

export function Layout({ children, flat, backTo, withNew }) {
  const updateTime = store.getLastUpdateTime();
  
  return (
    <FooterContainer>
      <div>
        <Header {...{ flat, backTo }} />
        {withNew && <LazyNewAdditions />}
        {children}
      </div>
      <Footer {...{ flat, updateTime }} />
    </FooterContainer>
  );
}
