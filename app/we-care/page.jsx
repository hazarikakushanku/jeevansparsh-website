import { UserCheck, Baby, Brain, HeartPulse, Dumbbell, Stethoscope } from "lucide-react";

export const metadata = {
  title: "We Care | Jeevansparsh",
  description: "Specialized care for all demographics including Geriatric, Pediatric, Neuro, and Women's health.",
};

export default function WeCare() {
  const specialities = [
    {
      title: "Geriatric Care",
      desc: "Specialized physiotherapy to address age-related mobility issues, fall prevention, arthritis management, and maintaining independence in older adults.",
      icon: UserCheck,
    },
    {
      title: "Pediatric Care",
      desc: "Gentle and effective rehabilitation for children with developmental delays, cerebral palsy, and orthopedic conditions to help them reach their milestones.",
      icon: Baby,
    },
    {
      title: "Neuro Physiotherapy",
      desc: "Focused on restoring function and mobility after neurological events like stroke, traumatic brain injuries, spinal cord injuries, or MS.",
      icon: Brain,
    },
    {
      title: "Women's Health",
      desc: "Expert care for pre/post-natal pain, pelvic floor dysfunction, osteoporosis, and post-surgical rehabilitation specific to women.",
      icon: HeartPulse,
    },
    {
      title: "Sports Rehabilitation",
      desc: "Rapid recovery programs for athletes, focusing on injury treatment, performance enhancement, and preventing future injuries.",
      icon: Dumbbell,
    },
    {
      title: "Post-Operative Care",
      desc: "Structured rehabilitation protocols following orthopedic surgeries like joint replacements or ligament reconstructions to ensure optimal recovery.",
      icon: Stethoscope,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Colourful Header Banner */}
        <div
          className="relative rounded-3xl overflow-hidden mb-12 sm:mb-16 py-12 sm:py-16 px-5 sm:px-8 text-center"
          style={{
            background: "linear-gradient(135deg, #0D1B40 0%, #1a3a6b 40%, #0e4d92 70%, #0D1B40 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute top-[-30%] left-[-5%] w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(250,204,21,0.25), transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-[-30%] right-[-5%] w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)", filter: "blur(80px)" }} />

          <div className="relative z-10">
            {/* Pill badge */}
            <span
              className="inline-block px-5 py-1.5 rounded-full text-xs font-bold mb-5 tracking-widest uppercase"
              style={{
                background: "linear-gradient(90deg, rgba(250,204,21,0.2), rgba(59,130,246,0.2))",
                color: "#FACC15",
                border: "1px solid rgba(250,204,21,0.4)",
              }}
            >
              ✦ Our Specialities ✦
            </span>

            {/* Gradient headline */}
            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #FACC15 50%, #93C5FD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We Care For You
            </h1>

            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#BAD4F5" }}>
              At <span style={{ color: "#FACC15", fontWeight: 600 }}>Jeevansparsh</span>, we understand that different stages of life and specific conditions require unique approaches. Our specialized care programs are designed around you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {specialities.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-8 hover:bg-jeevansparsh-blue transition-colors duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-white/15"
                style={{ background: "rgba(13,27,64,0.08)" }}
              >
                <item.icon
                  size={26}
                  className="text-jeevansparsh-blue group-hover:text-jeevansparsh-yellow transition-colors duration-300"
                />
              </div>

              <h3 className="text-xl font-bold text-jeevansparsh-blue mb-3 group-hover:text-jeevansparsh-yellow transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors duration-300 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
