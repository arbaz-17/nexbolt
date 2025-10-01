'use client';

export default function TextContentBlock({
  title = 'Built on a Modern, Production-Ready Stack',
  description = 'Powered by up-to-date, battle-tested technologies you can trust.',
  align = 'center', // 'left' | 'center'
  className = '',
  maxWidth = 'max-w-3xl',
}) {
  const alignClasses = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <section
      aria-labelledby="content-block-title"
      className={`relative py-10 md:py-10 ${className}`}
    >
      <div className={`mx-auto ${maxWidth} px-6 flex flex-col gap-4 ${alignClasses}`}>
        <h2
          id="content-block-title"
          className="font-heading text-3xl md:text-4xl font-semibold tracking-tight"
        >
          {title}
        </h2>

        <p className="text-base md:text-lg text-text-muted">
          {description}
        </p>
      </div>
    </section>
  );
}
