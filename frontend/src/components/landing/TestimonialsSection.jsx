import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "General Physician",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      comment:
        "Sehat has transformed how I manage my appointments. The interface is intuitive and my patients love the convenience.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      comment:
        "Booking appointments has never been easier! I can see available slots and book instantly. Highly recommended!",
      rating: 5,
    },
    {
      name: "Dr. Amit Patel",
      role: "Specialist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      comment:
        "The platform is reliable and professional. It helps me stay organized and provide better care to my patients.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-3">
              Trusted by Doctors & Patients
            </h2>
          </motion.div>
        </div>

        {/* Infinite Carousel */}
        <div className="relative overflow-hidden">
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-450px * 3 - 32px * 3));
              }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Gradient fade overlays on left and right */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scroll" style={{ width: "max-content" }}>
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-[450px] mx-4"
              >
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all">
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1e3a5f] text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-[450px] mx-4"
              >
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all">
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1e3a5f] text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
