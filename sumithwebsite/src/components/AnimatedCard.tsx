"use client"
import { motion } from 'framer-motion'

interface AnimatedCardProps {
  title: string
  content: string
}

export default function AnimatedCard({ title, content }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg p-6 m-4 cursor-pointer"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </motion.div>
  )
}