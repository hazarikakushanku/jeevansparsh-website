import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Jeevansparsh",
  description: "Get in touch with Jeevansparsh Physiotherapy and Rehabilitation Centre.",
};

export default function Contact() {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-12"
      style={{ background: "linear-gradient(135deg, #060E1C 0%, #0A1628 50%, #0D1B40 100%)" }}>

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FACC15, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #BAD4F5, transparent 70%)", filter: "blur(100px)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-widest uppercase"
            style={{ background: "rgba(250,204,21,0.12)", color: "#FACC15", border: "1px solid rgba(250,204,21,0.3)" }}>
            Reach Out
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-5"
            style={{ color: "#FFFFFF" }}>
            Contact <span style={{ color: "#FACC15" }}>Us</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#BAD4F5" }}>
            We&apos;re here to help you on your journey to recovery. Reach out to schedule an appointment or ask any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact Information Card */}
          <div className="relative rounded-3xl p-7 sm:p-10 md:p-14 overflow-hidden"
            style={{
              background: "rgba(13, 27, 64, 0.7)",
              border: "1px solid rgba(186, 212, 245, 0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}>

            {/* Card inner orbs */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(250,204,21,0.15), transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%)", filter: "blur(40px)" }} />

            <h2 className="text-3xl font-bold mb-10 relative z-10" style={{ color: "#FFFFFF" }}>
              Get In Touch
            </h2>

            <div className="space-y-9 relative z-10">
              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center rounded-2xl p-3"
                  style={{ background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.25)" }}>
                  <MapPin style={{ color: "#FACC15" }} size={22} />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1.5 tracking-wide" style={{ color: "#FFFFFF" }}>Our Location</h4>
                  <p className="leading-relaxed text-sm" style={{ color: "#BAD4F5" }}>
                    Opposite Assam Forest School,<br />
                    Near Gauhati University, Jalukbari,<br />
                    Guwahati – 781014, Assam
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center rounded-2xl p-3"
                  style={{ background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.25)" }}>
                  <Phone style={{ color: "#FACC15" }} size={22} />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1.5 tracking-wide" style={{ color: "#FFFFFF" }}>Contact / Appointments</h4>
                  <a href="tel:+919387634900" className="block text-sm hover:text-yellow-300 transition-colors" style={{ color: "#BAD4F5" }}>
                    +91 93876 34900
                  </a>
                  <a href="tel:+919435415007" className="block text-sm hover:text-yellow-300 transition-colors" style={{ color: "#BAD4F5" }}>
                    +91 94354 15007
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center rounded-2xl p-3"
                  style={{ background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.25)" }}>
                  <Mail style={{ color: "#FACC15" }} size={22} />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1.5 tracking-wide" style={{ color: "#FFFFFF" }}>Email Address</h4>
                  <a href="mailto:info@jeevansparsh.com" className="block text-sm hover:text-yellow-300 transition-colors" style={{ color: "#BAD4F5" }}>
                    info@jeevansparsh.com
                  </a>
                  <a href="mailto:appointments@jeevansparsh.com" className="block text-sm hover:text-yellow-300 transition-colors" style={{ color: "#BAD4F5" }}>
                    appointments@jeevansparsh.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5">
                <div className="w-13 h-13 flex-shrink-0 flex items-center justify-center rounded-2xl p-3"
                  style={{ background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.25)" }}>
                  <Clock style={{ color: "#FACC15" }} size={22} />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1.5 tracking-wide" style={{ color: "#FFFFFF" }}>Working Hours</h4>
                  <p className="text-sm" style={{ color: "#BAD4F5" }}>Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-sm" style={{ color: "#BAD4F5" }}>Sunday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-3xl overflow-hidden relative"
            style={{
              border: "1px solid rgba(186, 212, 245, 0.12)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              minHeight: "480px"
            }}>
            <iframe
              title="Jeevansparsh Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.3!2d91.6833!3d26.1445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5912e1a3c60d%3A0x4f1f5c1f0e6b7a8b!2sJalukbari%2C%20Guwahati%2C%20Assam%20781014!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "480px", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
