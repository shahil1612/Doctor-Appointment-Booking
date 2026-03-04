import Header from "./Header";
import HeroSection from "./HeroSection";
import WhyChooseSehat from "./WhyChooseSehat";
import HowSehatWorks from "./HowSehatWorks";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";
import DottedBackground from "../ui/DottedBackground";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Why Choose Sehat */}
      <DottedBackground>
        <WhyChooseSehat />
      </DottedBackground>

      {/* How Sehat Works */}
      <DottedBackground>
        <HowSehatWorks />
      </DottedBackground>

      {/* Testimonials */}
      <DottedBackground>
        <TestimonialsSection />
      </DottedBackground>

      {/* Footer */}

        <Footer />

    </div>
  );
};

export default LandingPage;
