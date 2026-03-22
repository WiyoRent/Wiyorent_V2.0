import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/public/home/Footer";

export const metadata = {
  title: "Terms & Conditions | WiyoRent",
  description:
    "Review WiyoRent's terms and conditions for using our student housing platform in Kigali. Understand your rights, responsibilities, and how we protect your data.",
  robots: {
    index: false,
    follow: true,
  },
};

const SECTIONS = [
  {
    id: "about-wiyorent",
    heading: "About WiyoRent",
    content: (
      <>
        <p>
          WiyoRent Ltd (&ldquo;WiyoRent&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) operates a digital platform that connects students in
          Kigali, Rwanda with verified housing listings and compatible housemates.
        </p>
        <p>
          WiyoRent is a housing discovery and housemate matching platform. We are not a
          landlord, a letting agent, or a party to any tenancy agreement. We do not own,
          manage, or lease any of the properties listed on the platform. Any rental
          agreement is strictly between the tenant and the relevant landlord or property
          owner.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    heading: "Eligibility",
    content: (
      <>
        <p>
          To create and maintain an account on WiyoRent, you must be a student currently
          enrolled at a recognised academic institution. This includes, but is not
          limited to, the University of Rwanda (UR), African Leadership University
          (ALU), Carnegie Mellon University Africa (CMU-Africa), and other accredited
          universities operating in or near Kigali.
        </p>
        <p>
          By creating an account, you confirm that you meet this eligibility requirement.
          WiyoRent reserves the right to verify your student status and to suspend or
          remove accounts where eligibility cannot be confirmed.
        </p>
        <p>
          You must be at least 18 years old to use the platform. By agreeing to these
          terms, you confirm that you are of legal age or have obtained the consent of a
          legal guardian.
        </p>
      </>
    ),
  },
  {
    id: "listings",
    heading: "Listings and Verification",
    content: (
      <>
        <p>
          WiyoRent manually reviews listings before they are published on the platform.
          Verification is intended to reduce the risk of fraudulent or inaccurate
          listings, but it does not constitute an endorsement of any landlord, property,
          or tenancy arrangement.
        </p>
        <p>
          WiyoRent is not liable for any disputes, losses, damages, or claims that arise
          between a landlord and a tenant as a result of a tenancy entered into through
          the platform. Users are responsible for conducting their own due diligence
          before signing any rental agreement or making any payment to a landlord.
        </p>
        <p>
          If you encounter a listing you believe to be inaccurate or fraudulent, please
          report it immediately to{" "}
          <a href="mailto:support@wiyorent.com">support@wiyorent.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "housemate-matching",
    heading: "Housemate Matching",
    content: (
      <>
        <p>
          Our housemate matching feature is a facilitation service designed to help
          students discover potentially compatible housemates based on self-reported
          preferences and lifestyle filters.
        </p>
        <p>
          WiyoRent does not guarantee the accuracy of any user&apos;s self-reported
          information, and we are not responsible for the outcomes of any housemate
          arrangement. Compatibility suggestions are generated based on the data you
          provide and are not a substitute for your own judgement.
        </p>
        <p>
          Users who connect through housemate matching are solely responsible for any
          agreements they enter into with each other. WiyoRent is not a party to such
          arrangements and accepts no liability arising from them.
        </p>
      </>
    ),
  },
  {
    id: "settling-in-packages",
    heading: "Settling-In Packages",
    content: (
      <>
        <p>
          WiyoRent offers paid settling-in packages that may include services such as
          airport pickup, SIM card assistance, bank account setup, and other
          onboarding support for students arriving in Kigali.
        </p>
        <p>
          All package purchases are final. Refund requests are handled on a case-by-case
          basis via WhatsApp and are at the sole discretion of WiyoRent. To request a
          refund, contact us via WhatsApp before your scheduled service date.
        </p>
        <p>
          WiyoRent is not liable for delays or disruptions to settling-in services caused
          by circumstances outside our reasonable control, including flight delays, public
          holidays, or third-party service failures.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable Use",
    content: (
      <>
        <p>When using the WiyoRent platform, you agree not to:</p>
        <ul>
          <li>
            Post false, misleading, or fraudulent information in your profile, listings,
            or any other part of the platform.
          </li>
          <li>
            Impersonate any other person, institution, or entity, or misrepresent your
            affiliation with any organisation.
          </li>
          <li>
            Use the platform for any non-housing commercial purpose, including but not
            limited to advertising unrelated products or services, soliciting users for
            third-party schemes, or scraping platform data.
          </li>
          <li>
            Harass, threaten, or abuse other users through any feature of the platform,
            including messaging and reviews.
          </li>
          <li>
            Attempt to circumvent any security or access control measure on the platform.
          </li>
          <li>
            Post content that is unlawful, discriminatory, or in violation of any
            applicable Rwandan law or regulation.
          </li>
        </ul>
        <p>
          WiyoRent reserves the right to investigate any reported violation and to
          suspend or permanently remove any account found to be in breach of these
          acceptable use standards, without prior notice.
        </p>
      </>
    ),
  },
  {
    id: "account-suspension",
    heading: "Account Suspension and Termination",
    content: (
      <>
        <p>
          WiyoRent reserves the right to suspend, restrict, or permanently delete any
          user account at our discretion, including where:
        </p>
        <ul>
          <li>The user has violated these Terms and Conditions.</li>
          <li>
            The user is found to have provided false information during registration or
            onboarding.
          </li>
          <li>
            The user&apos;s account or activity is reasonably suspected to be fraudulent
            or harmful to other users or to the platform.
          </li>
          <li>
            The user is no longer an enrolled student at a recognised institution.
          </li>
        </ul>
        <p>
          Where possible, we will notify you by email before taking action. In cases of
          serious or urgent violations, we may act immediately without notice.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    content: (
      <p>
        All content on the WiyoRent platform — including the logo, brand assets,
        interface design, and written content — is owned by or licensed to WiyoRent Ltd.
        You may not reproduce, distribute, or create derivative works from any part of
        the platform without our prior written consent. Content you post to the
        platform (such as profile information or reviews) remains yours, but you grant
        WiyoRent a non-exclusive licence to display and use it for the purposes of
        operating the platform.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    heading: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, WiyoRent Ltd shall not be
          liable for any indirect, incidental, special, or consequential damages arising
          from your use of, or inability to use, the platform or any services offered
          through it.
        </p>
        <p>
          WiyoRent&apos;s total liability to you for any claim arising out of or in
          connection with these terms shall not exceed the amount you paid to WiyoRent
          in the 12 months preceding the claim.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    heading: "Changes to These Terms",
    content: (
      <p>
        WiyoRent may update these Terms and Conditions from time to time. Where changes
        are material, we will notify you by email or via an in-platform notice. Your
        continued use of the platform after any changes are published constitutes your
        acceptance of the revised terms. We encourage you to review this page
        periodically.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    content: (
      <p>
        These Terms and Conditions are governed by and construed in accordance with the
        laws of the Republic of Rwanda. Any disputes arising out of or in connection
        with these terms shall be subject to the exclusive jurisdiction of the courts of
        Rwanda.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: (
      <p>
        If you have any questions about these Terms and Conditions, please contact
        WiyoRent Ltd at{" "}
        <a href="mailto:support@wiyorent.com">support@wiyorent.com</a>. Our team is
        based in Kigali, Rwanda.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <LegalNav />

      <header className="bg-secondary border-b-2 border-accent/30 pt-16 pb-12 px-6 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <p className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="font-primary text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="font-secondary text-sm text-white/40 mt-4">
            WiyoRent Ltd &middot; Kigali, Rwanda &middot; Effective January 1, 2025
          </p>
        </div>
      </header>

      <main className="flex-1 py-16 px-6 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <p className="font-secondary text-base text-base-content/70 leading-relaxed mb-12">
            Please read these Terms and Conditions carefully before using the WiyoRent
            platform. By creating an account or using any part of our service, you agree
            to be bound by these terms. If you do not agree, do not use the platform.
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
              WiyoRent Ltd is registered in Kigali, Rwanda. These terms were last
              updated on January 1, 2025. For questions or concerns, contact us at{" "}
              <a
                href="mailto:support@wiyorent.com"
                className="text-accent underline underline-offset-2 hover:opacity-75"
              >
                support@wiyorent.com
              </a>
              .
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
