import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Hero from '@/components/Services/Hero'
import {client} from '@/sanity/lib/client'

// GROQ query for Phase 1 (hero only)
const HERO_QUERY = `
  *[_type == "servicesHero"] | order(sortOrder asc)[0]{
    tag,
    heading,
    subheading,
    backgroundImage,
    backgroundImageMobile,
    ctaLabel,
    ctaUrl
  }
`

async function getData() {
  const hero = await client.fetch(HERO_QUERY)
  return {hero}
}

export const revalidate = 60 // adjust as needed

export default async function ServicesPage() {
  const {hero} = await getData()

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* offset for fixed nav if needed */}
      <div className="h-[60px] md:h-[90px]" />

      {/* Hero */}
      <Hero hero={hero} />

      {/* Future sections will go here in later phases */}

      <Footer />
    </main>
  )
}
