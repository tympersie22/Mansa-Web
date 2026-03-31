import PageHero from '@/components/mansa/PageHero';
import { faqs } from '@/lib/mansa-content';

export default function FAQsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="A few practical answers before the planning starts."
        description="Most journeys begin with a short conversation. These answers cover the questions we hear most often before that first step."
      />

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-5">
            {faqs.map((faq) => (
              <article key={faq.question} className="card-panel p-8">
                <h2 className="font-heading text-2xl text-text-primary">{faq.question}</h2>
                <p className="mt-4 text-base leading-8 text-text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
