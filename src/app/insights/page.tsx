import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#0f1624] text-white flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Insights{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20bbfd] to-[#23fc60]">
              Coming Soon
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 md:leading-relaxed mb-8 max-w-2xl mx-auto font-medium">
            We are working hard to bring you the latest industry insights, case studies, and technical deep-dives from Sumith Electronics. Stay tuned!
          </p>
          <div className="inline-flex items-center justify-center w-16 h-1 rounded-full bg-gradient-to-r from-[#20bbfd] to-[#23fc60]"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
