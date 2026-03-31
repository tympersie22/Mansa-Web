import PageHero from '@/components/mansa/PageHero';
import { journeys } from '@/lib/mansa-content';

export default function JourneysPage() {
  return (
    <>
      <PageHero
        eyebrow="Journeys"
        title="Illustrative routes that show what a MANSA TOURS AND TRAVEL trip can become."
        description="These are not fixed packages. They are starting points for thinking about rhythm, balance, and how different parts of Zanzibar and Tanzania can connect."
        secondaryHref="/experiences"
        secondaryLabel="Explore Experiences"
      />

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-6">
            {journeys.map((journey, index) => (
              <article
                key={journey.title}
                className="card-panel grid gap-6 p-8 md:grid-cols-[120px_1fr] md:items-start"
              >
                <p className="font-heading text-3xl text-accent">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h2 className="font-heading text-3xl text-text-primary">{journey.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
                    {journey.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
