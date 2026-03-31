import PageHero from '@/components/mansa/PageHero';

export default function CorporateDmcPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate & DMC"
        title="On-the-ground support for brands, agencies, events, and travel partners."
        description="MANSA TOURS AND TRAVEL can support private group travel, hosted stays, executive itineraries, and destination management needs with a premium, detail-led approach."
      />

      <section className="bg-surface-lighter py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3 lg:px-8">
          {[
            'Executive and incentive travel',
            'Production and hosted logistics',
            'Bespoke partner itinerary design',
          ].map((item) => (
            <article key={item} className="card-panel p-8">
              <p className="section-kicker mb-4">Support</p>
              <h2 className="font-heading text-2xl text-text-primary">{item}</h2>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
