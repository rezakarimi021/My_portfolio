import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Do I get lifetime access after enrolling?',
    a: 'Yes. Once enrolled, you have permanent access to the course and all future updates. We add new lessons whenever the ecosystem changes significantly.',
  },
  {
    q: 'Are these courses beginner-friendly?',
    a: 'It depends on the course. Each card shows a difficulty level: Beginner, Intermediate, or Advanced. Check the colored border — blue is Beginner, purple is Intermediate, orange is Advanced — and read the prerequisites on the course page before enrolling.',
  },
  {
    q: "What if I don't like a course?",
    a: "You can request a full refund within 30 days of purchase, no questions asked. We'd rather you find the right course than keep your money.",
  },
  {
    q: 'Do you offer team or corporate pricing?',
    a: 'Yes. For teams of 5 or more, contact us at teams@devpath.io for a volume discount and centralized billing. We work with engineering managers directly.',
  },
  {
    q: 'Can I download lessons for offline viewing?',
    a: 'Yes. All lessons are available for download via our iOS and Android apps. Web-based downloads are available for Pro subscribers.',
  },
  {
    q: 'Are certificates included?',
    a: 'Every course includes a completion certificate you can share on LinkedIn or with employers. Certificates are issued via Credly and link to a verifiable credential.',
  },
  {
    q: 'How are instructors selected?',
    a: 'We only work with practitioners who are actively building in production. Every instructor goes through a 3-stage review: portfolio check, sample lesson, and content audit before being published.',
  },
  {
    q: 'What language are the courses in?',
    a: 'All courses are in English. Auto-generated subtitles are available in 12 languages, with human-reviewed subtitles in Spanish, French, and German.',
  },
]

export function FAQ() {
  return (
    <section id="faq" style={{
      padding: '80px 0',
      borderTop: '1px solid #1E1E26',
    }}>
      <div className="container-dp">
        <div style={{ marginBottom: '48px' }}>
          <div className="section-label">common questions</div>
          <h2 className="section-title" style={{ marginBottom: '0' }}>Before you enroll</h2>
        </div>

        <div style={{ maxWidth: '720px' }}>
          <Accordion type="single" collapsible style={{ borderTop: '1px solid #1E1E26' }}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                style={{
                  borderBottom: '1px solid #1E1E26',
                }}
              >
                <AccordionTrigger
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#EEECEA',
                    padding: '20px 0',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: '#8A8997',
                    lineHeight: 1.7,
                    paddingBottom: '20px',
                  }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
