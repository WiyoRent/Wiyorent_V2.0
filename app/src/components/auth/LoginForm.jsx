import Image from 'next/image';
import { ShieldCheck, GraduationCap, MapPin } from 'lucide-react';
import LoginCard from '@/components/auth/LoginCard';

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: 'Student-verified listings',
    body: 'Every profile and listing manually reviewed before going live.',
  },
  {
    icon: GraduationCap,
    title: 'Find housemates from your university',
    body: 'Match with students from UR, ALU, CMU-Africa, and more.',
  },
  {
    icon: MapPin,
    title: 'Neighbourhoods close to campus',
    body: 'Find a house proximity to where you study',
  },
];

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='24,1 47,24 24,47 1,24' fill='none' stroke='%23F1C528' stroke-width='0.7' stroke-opacity='0.22'/%3E%3C/svg%3E")`;

export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left column — branding / hero ───────────────────────────────────── */}
      <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-secondary overflow-hidden lg:w-1/2 lg:min-h-screen">

        {/* Geometric diamond-mesh pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: PATTERN_BG }} />

        {/* Decorative rings */}
        <div className="hidden lg:block absolute -bottom-36 -right-36 w-96 h-96 rounded-full border border-accent/10 pointer-events-none" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-accent/15 pointer-events-none" />
        <div className="hidden lg:block absolute top-0 -left-24 w-72 h-72 rounded-full border border-accent/10 pointer-events-none" />

        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative">
            <Image src="/logo.svg" alt="WiyoRent" fill className="object-contain" priority />
          </div>
        </div>

        {/* Headline + value props */}
        <div className="relative z-10 flex flex-col gap-6 lg:gap-10 mt-8 lg:mt-0 text-white">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-primary uppercase tracking-tight leading-tight">
              Find your people.<br />Find your place.
            </h1>
            <p className="font-secondary text-primary/50 text-sm mt-3 sm:mt-4 leading-relaxed max-w-sm">
              Wiyorent connects students across Kigali with verified housemates and real listings — no agencies, no guesswork.
            </p>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-5">
            {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-accent" />
                </div>
                <div>
                  <p className="font-primary text-xs font-extrabold text-primary uppercase tracking-wide leading-tight">
                    {title}
                  </p>
                  <p className="font-secondary text-xs text-primary/45 mt-0.5 leading-snug">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location badge */}
        <div className="relative z-10 mt-8 lg:mt-0">
          <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 rounded-lg px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-widest">
              Kigali, Rwanda
            </span>
          </div>
        </div>
      </div>

      {/* ── Right column — login form ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-14 bg-base-200">
        <LoginCard />
      </div>

    </div>
  );
}