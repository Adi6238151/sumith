'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import styles from './solutions.module.css'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const MotionLink = motion(Link)

interface Props {
  title: string
  theme: 'blue' | 'green'
  image: SanityImageSource
  imagePosition: 'left' | 'right'
  link?: string
}

export default function SolutionCard({
  title,
  theme,
  image,
  imagePosition,
  link,
}: Props) {
  const Wrapper = link ? MotionLink : motion.div
  const wrapperProps = link ? { href: link } : {}

  return (
    <motion.div
      variants={{ rest: {}, hover: {} }}
      initial="rest"
      whileHover="hover"
    >
      <Wrapper
        {...wrapperProps}
        className={`${styles.card} ${styles[theme]}`}
      >
        <div className={styles.content}>
          <h3 className={styles.title}>
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h3>

          {/* ✅ Show button only when link exists */}
          {link && (
            <span className={styles.cta}>
              Explore <span className={styles.arrow}>→</span>
            </span>
          )}
        </div>

        <motion.div
          className={styles.imageWrap}
          variants={{
            rest: { y: 0 },
            hover: { y: -200 },
          }}
          transition={{
            type: 'tween',
            duration: 0.1,
            ease: [0.4, 0.0, 1, 1],
          }}
        >
          <Image
            src={urlFor(image).width(580).height(480).url()}
            alt=""
            fill
            className={styles.image}
          />
        </motion.div>
      </Wrapper>
    </motion.div>
  )
}
