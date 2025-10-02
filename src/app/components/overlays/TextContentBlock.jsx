'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function TextContentBlock({
  title = 'Built on a Modern, Production-Ready Stack',
  description = '',
  align = 'center', // 'left' | 'center'
  className = '',
  maxWidth = 'max-w-3xl',
}) {
  const reduce = useReducedMotion();
  const alignClasses =
    align === 'left' ? 'text-left items-start' : 'text-center items-center';

  const container = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.08 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <motion.section
      aria-labelledby="content-block-title"
      className={`relative py-4 md:py-6 ${className}`}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
    >
      <div className={`mx-auto ${maxWidth} px-6 flex flex-col gap-4 ${alignClasses}`}>
        <motion.h2
          id="content-block-title"
          className="font-heading text-3xl md:text-4xl font-bold tracking-tight"
          variants={child}
        >
          {title}
        </motion.h2>

        <motion.p className="text-base md:text-lg text-text-muted" variants={child}>
          {description}
        </motion.p>
      </div>
    </motion.section>
  );
}
