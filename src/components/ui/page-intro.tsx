interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="text-primary text-sm font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="text-secondary mt-5 text-lg leading-8">{description}</p>
    </header>
  );
}
