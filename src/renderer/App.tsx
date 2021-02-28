import type * as React from 'react'
import { motion } from 'framer-motion'
import TopBar from './components/top-bar'
import logo from './logo.png'

const containerMotion = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
}

function App() {
  return (
    <div tw="h-screen w-screen flex flex-col pt-12">
      <TopBar />
      <motion.div tw="h-full" {...containerMotion}>
        <div tw="flex flex-col items-center justify-center h-full pb-0">
          <img tw="h-48 ml-5" src={logo} draggable="false" />
        </div>
      </motion.div>
    </div>
  )
}

export default App
