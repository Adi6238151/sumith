'use client'

import { motion } from 'framer-motion'
import SolutionCard from './SolutionCard'
import styles from './solutions.module.css'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Solution {
  _id: string
  title: string
  theme: 'blue' | 'green'
  image: SanityImageSource
  imagePosition: 'left' | 'right'
  exploreLink?: string 
  slug: {
    current: string
  }
}

interface Props {
  solutions: Solution[]
}

export default function SolutionsShowcase({ solutions }: Props) {
  return (
    <motion.section
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {solutions.map((solution) => (
        <SolutionCard
          key={solution._id}
          title={solution.title}
          theme={solution.theme}
          image={solution.image}
          imagePosition={solution.imagePosition}
          link={solution.exploreLink}
        />
      ))}
    </motion.section>
  )
}
