'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function HeadlineBlock({
  title = 'Built on a Modern, Production-Ready Stack',
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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      aria-labelledby="content-block-title"
      className={`relative ${className}`}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
    >
      <div className={`mx-auto ${maxWidth} px-6 flex flex-col gap-4 ${alignClasses}`}>
        <h2
          id="content-block-title"
          className="font-heading text-3xl md:text-4xl font-semibold tracking-tight"
        >
          {title}
        </h2>
      </div>
    </motion.section>
  );
}
