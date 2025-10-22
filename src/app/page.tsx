import Navigation from '@/components/Navigation'
import HeroSection from '@/components/homepage/HeroSection'
import WhiteGradientTransition from '@/components/homepage/WhiteGradientTransition'
import SolutionCarousel from '@/components/homepage/SolutionCarousel'
import SumithTMSBenefits from "@/components/homepage/SumithTMSBenefits"
import ITMSServicesGrid from "@/components/homepage/ITMSServicesGrid"
import CustomerLogoGrid from "@/components/homepage/CustomerLogoGrid"
import StickySidebar from "@/components/StickySidebar"
import { sanity } from '@/lib/sanity.client'

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



export default async function Home() {
  const heroData = await sanity.fetch(heroSectionQuery)
  const carouselData = await sanity.fetch(carouselQuery)
  const benefitsData = await sanity.fetch(benefitsQuery)
  const servicesGridData = await sanity.fetch(servicesGridQuery)
  const customerLogoGridData = await sanity.fetch(customerLogoGridQuery)


  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection heroData={heroData} />
      <WhiteGradientTransition />
      <div className="bg-white">
        <SolutionCarousel slides={carouselData?.slides || []} />
        <SumithTMSBenefits benefitsData={benefitsData} />
        <ITMSServicesGrid servicesGridData={servicesGridData} />
        <CustomerLogoGrid customerLogoGridData={customerLogoGridData} />
        <StickySidebar />
      </div>
    </div>
  )
}
