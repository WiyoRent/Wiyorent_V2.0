const TESTIMONIALS = [
  {
    name: "Ange CARLA",
    flag: "🇧🇫",
    body: "I was pleasantly surprised already by your availability and the speed with which you found this apartment and explained all the required conditions. I also appreciated the airport service and the patience you particularly showed when I had the problem with my luggage (personally I would have lost my temper... Since you arrived before the plane and had to wait another two hours). I like the apartment and the fact that it is close to my university. Also I would like to point out that Winston is really very kind, he took good care of me. The proof is that I was able to take a tour of the city by myself today. As for the prices I found them quite affordable. So far I am enjoying my stay here. Keep going guys☺",
  },
  {
    name: "Peter UDOCHUKWU",
    flag: "🇳🇬",
    body: "The agency was fantastic in helping me find the perfect rental accommodation! They offered a range of options within my budget and were responsive and professional throughout the process. The staff was friendly, knowledgeable, and genuinely cared about ensuring I was satisfied. They made the entire experience stress-free, and I'd highly recommend them to any student looking for housing.",
  },
  {
    name: "Sabattinah TOJONIRINA",
    flag: "🇲🇬",
    body: "I had such a great experience from the service provided by WiyoRent. They were so friendly and welcoming. The car was really comfortable with the professional driver. I enjoyed it. Thank you WiyoRent for welcoming me this warmly. All the best,",
  },
  {
    name: "Ibrahim MAAZOU",
    flag: "🇳🇪",
    body: "Wiyorent offers adequate services for its customers, especially for new students who may feel out of place at first sight. Everyone will be able to find something to suit their budget.",
  },
  {
    name: "Goodluck OGBONNA",
    flag: "🇳🇬",
    body: "Wiyorent is a trusted and dependable agency. One thing I like about its services is the variety they offer, ranging from affordable housing for students to options for tourists.",
  },
];

export default function Testimonials() {
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
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary border border-secondary/10 rounded-2xl p-8"
              data-aos="zoom-in-down"
            >
              <p className="font-secondary text-sm text-secondary/80 mb-6 italic">
                "{testimonial.body}"
              </p>

              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-primary text-base font-bold text-secondary">
                    {testimonial.name} {testimonial.flag}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
