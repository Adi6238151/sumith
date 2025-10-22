import Navigation from '@/components/Navigation'
import HeroSection from '@/components/homepage/HeroSection'
import WhiteGradientTransition from '@/components/homepage/WhiteGradientTransition'


import SolutionCarousel from '@/components/homepage/SolutionCarousel' // <-- import your carousel section
import SumithTMSBenefits from "@/components/homepage/SumithTMSBenefits"
import ITMSServicesGrid from "@/components/homepage/ITMSServicesGrid"
import CustomerLogoGrid from "@/components/homepage/CustomerLogoGrid"
import StickySidebar from "@/components/StickySidebar"


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WhiteGradientTransition />   {/* <- Insert gradient here */}
      {/* Solution/Product Carousel Section */}
      <div className="bg-white">
        <SolutionCarousel />
        <SumithTMSBenefits/>
        <ITMSServicesGrid/>
        <CustomerLogoGrid/>
        <StickySidebar />
      </div>
    </div>
  )
}
