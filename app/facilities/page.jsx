import { Activity, Zap, Droplets, Waves, Stethoscope, HandHeart } from "lucide-react";

export const metadata = {
  title: "Facilities | Jeevansparsh",
  description: "Explore our state-of-the-art physiotherapy facilities including electrotherapy, cupping, and more.",
};

export default function Facilities() {
  const facilities = [
    { name: "Expert Consultation", icon: Stethoscope, desc: "Comprehensive physical assessment and personalized treatment planning by senior physiotherapists." },
    { name: "Electrotherapy", icon: Zap, desc: "Advanced pain management using TENS, IFT, Ultrasound, and Laser therapy." },
    { name: "Cupping Therapy", icon: Droplets, desc: "Traditional myofascial decompression to improve blood flow and relieve muscle tension." },
    { name: "Hydrotherapy", icon: Waves, desc: "Aquatic exercises in a controlled temperature pool to reduce joint stress and improve mobility." },
    { name: "Manual Therapy", icon: HandHeart, desc: "Hands-on techniques including joint mobilization and soft tissue manipulation." },
    { name: "Exercise Therapy", icon: Activity, desc: "Guided strengthening, stretching, and endurance training in our modern gym." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-jeevansparsh-blue mb-4">Our Facilities</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are equipped with advanced technology and modern amenities to provide you with the most effective rehabilitation experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((facility, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 text-jeevansparsh-blue rounded-2xl flex items-center justify-center mb-6">
                <facility.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-jeevansparsh-blue mb-3">{facility.name}</h3>
              <p className="text-gray-600 leading-relaxed">{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
