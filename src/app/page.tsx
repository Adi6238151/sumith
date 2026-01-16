import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import HeroSection from "@/components/homepage/HeroSection"
import WhiteGradientTransition from "@/components/homepage/WhiteGradientTransition"
import SolutionCarousel from "@/components/homepage/SolutionCarousel"
import SumithTMSBenefits from "@/components/homepage/SumithTMSBenefits"
import ITMSServicesGrid from "@/components/homepage/ITMSServicesGrid"
import CustomerLogoGrid from "@/components/homepage/CustomerLogoGrid"
import StickySidebar from "@/components/StickySidebar"
import IndiaPresence from "@/components/homepage/IndiaPresence"
import { sanity } from "@/lib/sanity.client"

export const revalidate = 60

const heroSectionQuery = `
  *[_type=="heroSection"][0]{
    headline,
    badge,
    solutions,
    description,
    button1Text,
    button2Text,
    stats,
    backgroundImage{asset->{url}},
    seo
  }
`

const carouselQuery = `
  *[_type=="solutionCarousel"][0]{
    slides[]{
      label,
      title,
      description,
      image{asset->{url}}
    },
    seo
  }
`

const benefitsQuery = `
  *[_type=="sumithBenefits"][0]{
    heading,
    subtitle,
    benefits[]{
      icon,
      title,
      desc
    },
    seo
  }
`

const servicesGridQuery = `
  *[_type=="itmssServiceGrid"][0]{
    heading,
    services[]{
      name,
      icon,
      badge
    },
    seo
  }
`

const customerLogoGridQuery = `
  *[_type=="customerLogoGrid"][0]{
    heading,
    oems[]{
      name,
      "logo": logo.asset->url
    },
    otherSegments[]{
      name,
      "logo": logo.asset->url
    },
    seo
  }
`

const indiaPresenceQuery = `
 *[_type == "indiaPresence"][0]{
    title,
    subtitle,
    states[]{
      stateId,
      name,
      heading,
      bullets
    }
  }
`

export default async function Home() {
  const heroData = await sanity.fetch(heroSectionQuery)
  const carouselData = await sanity.fetch(carouselQuery)
  const benefitsData = await sanity.fetch(benefitsQuery)
  const servicesGridData = await sanity.fetch(servicesGridQuery)
  const customerLogoGridData = await sanity.fetch(customerLogoGridQuery)
  const indiaPresenceData = await sanity.fetch(indiaPresenceQuery)

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection heroData={heroData} />
      <WhiteGradientTransition />
      <div className="bg-white">
        <SolutionCarousel slides={carouselData?.slides || []} />

        {/* India Presence Map - Positioned below SolutionCarousel */}
        {indiaPresenceData && <IndiaPresence data={indiaPresenceData} />}

        <SumithTMSBenefits benefitsData={benefitsData} />
        <ITMSServicesGrid servicesGridData={servicesGridData} />
        <CustomerLogoGrid customerLogoGridData={customerLogoGridData} />
        <StickySidebar />
      </div>
      <Footer />
    </div>
  )
}
