import PageHero from '@/components/mansa/PageHero';

const principles = [
  'Simple on the surface. Rich in detail underneath.',
  'Private, premium, and intentional without unnecessary excess.',
  'Ground-level coordination that protects consistency throughout the trip.',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="MANSA TOURS AND TRAVEL designs Zanzibar journeys with clarity, atmosphere, and care."
        description="We focus on travel that feels effortless to the guest because it has been considered carefully behind the scenes, from pacing and logistics to the tone of each day."
      />

      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="card-panel p-8 md:p-10">
            <p className="section-kicker mb-5">Our Approach</p>
            <div className="space-y-5 text-base leading-8 text-text-secondary">
              <p>
                Zanzibar has range. Coastline, heritage, culture, and mainland access all shift the
                meaning of a trip depending on how they are put together.
              </p>
              <p>
                MANSA TOURS AND TRAVEL exists to make those combinations feel coherent. We plan
                with intention, keep the structure clear, and leave room for the softer details
                that make travel feel personal.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {principles.map((principle) => (
              <div key={principle} className="card-panel p-8">
                <p className="section-kicker mb-4">Principle</p>
                <h2 className="font-heading text-2xl text-text-primary">{principle}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
