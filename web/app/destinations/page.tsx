import PageHero from '@/components/mansa/PageHero';
import { destinations } from '@/lib/mansa-content';

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Places across Zanzibar and mainland Tanzania selected for how they fit together."
        description="We focus on destinations that reward good pacing and thoughtful planning, whether that means heritage, coast, marine time, or a mainland extension."
      />

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {destinations.map((destination) => (
              <div key={destination} className="card-panel p-8">
                <p className="section-kicker mb-4">Destination</p>
                <h2 className="font-heading text-3xl text-text-primary">{destination}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
