import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import styles from "./ProductFeatureSection.module.css";

export default function ProductFeatureSection({ data, isReverse }) {
  if (!data) return null;

  return (
    <section className={styles.section}>
      <div 
        className={`${styles.container} ${isReverse ? styles.reverse : ''}`}
      >
        {/* IMAGE SIDE */}
        <div className={styles.imageContainer}>
          {data.image && (
            <div className={styles.imageWrapper}>
              <Image
                src={urlFor(data.image).width(1400).url()}
                alt={data.title || "Feature"}
                fill
                priority={false}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        {/* TEXT SIDE */}
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            {data.title}
          </h2>

          <p className={styles.description}>
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
