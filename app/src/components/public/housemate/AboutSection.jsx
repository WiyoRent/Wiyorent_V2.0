import { MessageSquare } from 'lucide-react';

export default function AboutSection({ about_me }) {
  return (
    <section className="bg-base-100 rounded-box p-5 shadow-sm">
      <h2 className="font-primary text-sm font-extrabold text-base-content uppercase tracking-widest mb-4 flex items-center gap-3">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        About Me
      </h2>
      <p className="font-secondary text-sm text-base-content/65 leading-relaxed">
        {about_me}
      </p>
    </section>
  );
}