import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/public/home/Footer";

export const metadata = {
  title: "Privacy Policy | WiyoRent",
  description:
    "Learn how WiyoRent collects, uses, and protects your personal data on our student housing platform in Kigali. Your privacy and data security are our priority.",
  robots: {
    index: false,
    follow: true,
  },
};

const SECTIONS = [
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    content: (
      <>
        <p>
          When you create a WiyoRent account or complete your profile, we collect the
          following personal information:
        </p>
        <ul>
          <li>
            <strong>Identity data:</strong> your full name, profile photo, and university
            or institution affiliation.
          </li>
          <li>
            <strong>Contact data:</strong> your email address and, if you choose to
            provide it, your WhatsApp number.
          </li>
          <li>
            <strong>Housing preferences:</strong> your budget range, preferred
            neighbourhoods, room type, and move-in timeline.
          </li>
          <li>
            <strong>Housemate matching data:</strong> lifestyle details such as sleep
            schedule, cleanliness preferences, smoking and pet tolerance, and other
            compatibility filters you complete voluntarily.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, listings viewed, and actions
            taken on the platform, collected automatically to help us improve the
            service.
          </li>
        </ul>
        <p>
          Providing your WhatsApp number is entirely optional. All other fields marked
          as required are necessary to create a functional profile on the platform.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-your-data",
    heading: "How We Use Your Data",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To display your profile and listings to other verified users of the platform.</li>
          <li>
            To power housemate matching — surfacing compatible profiles based on your
            stated preferences and filters.
          </li>
          <li>
            To send you service-related communications, including account confirmations,
            listing status updates, and important platform notices.
          </li>
          <li>
            To analyse platform usage in aggregate so we can improve features, fix
            issues, and grow our verified housing inventory.
          </li>
          <li>
            To verify that users are enrolled students at a recognised institution, in
            line with our eligibility requirements.
          </li>
        </ul>
        <p>
          We do not use your data for automated profiling or decisions that have legal or
          similarly significant effects on you.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    heading: "Data Sharing",
    content: (
      <>
        <p>
          WiyoRent does not sell, rent, or trade your personal data to any third party.
          We do not use your data for third-party advertising.
        </p>
        <p>
          We share data only with trusted infrastructure and service providers who help
          us operate the platform, including:
        </p>
        <ul>
          <li>
            <strong>Neon</strong> — our managed PostgreSQL database provider, where your
            account and profile data is stored securely.
          </li>
          <li>
            <strong>Vercel</strong> — our hosting provider for the web application.
          </li>
          <li>
            <strong>Resend</strong> — our transactional email provider, used to deliver
            account and service notifications.
          </li>
          <li>
            <strong>Google OAuth</strong> — used for sign-in. We receive only the
            information Google shares during authentication (name, email, and profile
            photo).
          </li>
        </ul>
        <p>
          All third-party providers are contractually required to process your data only
          as instructed by WiyoRent and to maintain appropriate security standards.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    content: (
      <>
        <p>
          We retain your personal data for as long as your account remains active on
          the platform.
        </p>
        <p>
          If you request deletion of your account, all personally identifiable
          information associated with your profile — including your name, email, photo,
          preferences, and contact details — will be permanently purged from our systems
          within 30 days of your request.
        </p>
        <p>
          Aggregated, anonymised usage statistics that cannot be linked back to you may
          be retained indefinitely for analytics purposes.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    content: (
      <>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li>
            <strong>Access:</strong> you may request a copy of the personal data we hold
            about you.
          </li>
          <li>
            <strong>Correction:</strong> you may update your profile information directly
            within your account settings at any time.
          </li>
          <li>
            <strong>Deletion:</strong> you may request that your account and all
            associated data be deleted by emailing{" "}
            <a href="mailto:support@wiyorent.com">support@wiyorent.com</a>.
          </li>
          <li>
            <strong>Withdrawal of consent:</strong> where processing is based on your
            consent, you may withdraw it at any time without affecting the lawfulness of
            prior processing.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:support@wiyorent.com">support@wiyorent.com</a>. We will
          respond within 14 business days.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies",
    content: (
      <>
        <p>
          WiyoRent uses cookies minimally and only for essential purposes. Specifically,
          we use a single session cookie issued by our authentication provider (NextAuth)
          to keep you signed in between visits.
        </p>
        <p>
          We do not use advertising cookies, tracking pixels, or any third-party
          analytics cookies. You may configure your browser to block or delete cookies,
          but doing so will prevent you from staying signed in to the platform.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    content: (
      <p>
        We take reasonable technical and organisational measures to protect your
        personal data against unauthorised access, disclosure, alteration, or
        destruction. All data in transit is encrypted via HTTPS, and our database
        provider enforces encryption at rest. However, no system can guarantee
        absolute security, and we encourage you to use a strong Google account
        password and to log out of shared devices.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    content: (
      <p>
        This Privacy Policy is governed by and construed in accordance with the laws of
        the Republic of Rwanda. Any disputes arising in connection with this policy shall
        be subject to the exclusive jurisdiction of the courts of Rwanda.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: (
      <p>
        If you have any questions about this Privacy Policy or how we handle your
        personal data, please contact WiyoRent Ltd at{" "}
        <a href="mailto:support@wiyorent.com">support@wiyorent.com</a>. Our team is
        based in Kigali, Rwanda.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <LegalNav />

      <header className="bg-secondary border-b-2 border-accent/30 pt-16 pb-12 px-6 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <p className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="font-primary text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
            Privacy Policy
          </h1>
          <p className="font-secondary text-sm text-white/40 mt-4">
            WiyoRent Ltd &middot; Kigali, Rwanda &middot; Effective January 1, 2025
          </p>
        </div>
      </header>

      <main className="flex-1 py-16 px-6 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <p className="font-secondary text-base text-base-content/70 leading-relaxed mb-12">
            This Privacy Policy explains how WiyoRent Ltd (&ldquo;WiyoRent&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses,
            and protects your personal information when you use our platform at{" "}
            wiyorent.com. By creating an account, you agree to the practices described
            below.
          </p>

          <div className="flex flex-col gap-12">
            {SECTIONS.map(({ id, heading, content }) => (
              <section key={id} id={id}>
                <h2 className="font-primary text-xl font-bold text-base-content uppercase tracking-wide mb-4">
                  {heading}
                </h2>
                <div className="font-secondary text-sm text-base-content/70 leading-relaxed flex flex-col gap-3 legal-prose">
                  {content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-base-300">
            <p className="font-secondary text-xs text-base-content/40 leading-relaxed">
              WiyoRent Ltd is registered in Kigali, Rwanda. This policy was last updated
              on January 1, 2025. We may update this policy from time to time; continued
              use of the platform after changes are published constitutes acceptance of
              the revised policy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function LegalNav() {
  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/8 px-6 lg:px-16 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="WiyoRent"
            width={44}
            height={28}
            className="border border-accent/50 rounded-lg"
          />
          <span className="font-primary text-lg font-bold text-white tracking-widest">
            WIYORENT
          </span>
        </Link>
        <Link
          href="/listings"
          className="btn btn-accent btn-sm font-primary font-bold text-secondary border-none rounded-lg tracking-wide"
        >
          Find a House
        </Link>
      </div>
    </nav>
  );
}
