import Image from "../image";
import styles from "./styles.module.scss";

export function Background() {
  return (
    <div className={styles.background}>
      <Image fill
        unoptimized
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        src="/images/background.jpg"
        alt="background"
      />
    </div>
  );
} 