export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "WiyoRent made finding a place in Kigali so easy! The verification process gave me peace of mind, and I found the perfect apartment with great roommates.",
      name: "John Doe",
      role: "Computer Science Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      quote:
        "The settlement services were a lifesaver. From the airport pickup to getting a local SIM, the WiyoRent team was incredibly helpful. Highly recommend!",
      name: "Jane Smith",
      role: "International Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      quote:
        "I was worried about moving to a new country, but WiyoRent took care of everything. I felt safe and supported in every step.",
      name: "Samuel Chen",
      role: "Engineering Student",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    },
  ];

  return (
    <section
      data-aos="fade-up"
      id="testimonials"
      className="bg-white py-16 px-6 lg:px-16"
    >
      <div className="container mx-auto">
        <h2 className="font-primary text-4xl lg:text-5xl font-bold text-center text-secondary mb-12">
          WHAT OUR STUDENTS SAY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary border border-secondary/10 rounded-2xl p-8"
              data-aos="zoom-in-down"
            >
              <p className="font-secondary text-sm text-secondary/80 mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-secondary/10"
                />
                <div>
                  <h4 className="font-primary text-base font-bold text-secondary">
                    {testimonial.name}
                  </h4>
                  <p className="font-secondary text-xs text-secondary/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
