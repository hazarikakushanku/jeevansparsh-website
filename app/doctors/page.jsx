export const metadata = {
  title: "Doctors | Jeevansparsh",
  description: "Meet Dr. Jeevansparsh and our team of expert physiotherapists.",
};

export default function Doctors() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-jeevansparsh-blue mb-4">Our Experts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to your recovery and well-being.
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-blue-100 flex items-center justify-center p-8 sm:p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-jeevansparsh-blue/80 to-transparent z-10 hidden md:block"></div>
            <div className="w-48 h-48 md:w-full md:h-full bg-white rounded-full md:rounded-none flex items-center justify-center shadow-inner relative z-0 md:absolute md:inset-0 overflow-hidden">
              <img src="/doctor.png" alt="Dr. Naba Pallab Bhuyan" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block absolute bottom-8 left-8 z-20">
              <h2 className="text-3xl font-bold text-white mb-1">Dr. Jeevansparsh</h2>
              <p className="text-jeevansparsh-yellow font-medium">Chief Physiotherapist</p>
            </div>
          </div>

          <div className="md:w-3/5 p-8 md:p-12">
            <div className="md:hidden mb-6 text-center">
              <h2 className="text-3xl font-bold text-jeevansparsh-blue mb-1">Dr. Jeevansparsh</h2>
              <p className="text-jeevansparsh-yellow font-medium">Chief Physiotherapist</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Professional Summary</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dr. Jeevansparsh is a highly respected physiotherapist with extensive experience in treating complex musculoskeletal and neurological conditions. His approach combines evidence-based practices with deep compassion for his patients, ensuring that each individual receives a personalized path to recovery.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Qualifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Master of Physiotherapy</li>
                  <li>Bachelor of Physiotherapy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Sports Rehabilitation", "Neuro-Rehabilitation", "General Physiotherapy Services"].map(skill => (
                    <span key={skill} className="bg-blue-50 text-jeevansparsh-blue px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
