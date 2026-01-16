import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import AboutHero from "@/components/about/AboutHero"
import StatsStrip from "@/components/about/StatsStrip"
import PartnerLogos from "@/components/about/PartnerLogos"
import MissionVision from "@/components/about/MissionVision"
import CoreValues from "@/components/about/CoreValues"
import AboutTimeline from "@/components/about/AboutTimeline"
import TechnologyPartners from "@/components/about/TechnologyPartners"
import CallToAction from "@/components/about/CallToAction"
import Testimonials from "@/components/about/Testimonials"
import Awards from "@/components/about/Awards"
import Leadership from "@/components/about/Leadership"
import { sanity } from "@/lib/sanity.client"

const aboutPageQuery = `{
  "hero": *[_type == "aboutPage"][0]{
    hero{
      kicker,
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url,
      ctaLabel,
      ctaHref
    }
  },
  "stats": *[_type == "aboutStats"][0]{
    stats[]{
      value,
      label
    }
  },
  "partners": *[_type == "aboutPartners"][0]{
    partners[]{
      name,
      "logoUrl": logo.asset->url,
      order
    }
  },
  "coreValues": *[_type == "aboutCoreValues"][0]{
    title,
    values[]{
      title,
      description,
      "iconUrl": icon.asset->url
    }
  },
  "missionVision": *[_type == "aboutMissionVision"][0]{
    mission,
    vision
  },
  "timeline": *[_type == "aboutTimeline"][0]{
    eyebrow,
    heading,
    intro,
    timelineItems[]{
      year,
      title,
      summary,
      highlight
    }
  },
  "techPartners": *[_type == "aboutTechPartners"][0]{
    title,
    partners[]{
      name,
      "logoUrl": logo.asset->url,
      order
    }
  },
  "cta": *[_type == "aboutCTA"][0]{
    heading,
    buttonText,
    buttonLink
  },
  "testimonials": *[_type == "aboutTestimonials"][0]{
    title,
    testimonials[]{
      quote,
      name,
      role
    }
  },
  "awards": *[_type == "aboutAwards"][0]{
    title,
    awards[]{
      title,
      subtitle,
      "iconUrl": icon.asset->url,
      order
    } | order(order asc)
  },
  "leadership": *[_type == "aboutLeadership"][0]{
    title,
    members[]{
      name,
      "photoUrl": photo.asset->url,
      order
    } | order(order asc),
    ctaText,
    ctaLink
  }
}`

export default async function AboutPage() {
  const data = await sanity.fetch(aboutPageQuery)

  return (
    <>
      <Navigation />
      <main style={{ background: "#000000" }}>
        {!data && (
          <section
            style={{
              maxWidth: "960px",
              margin: "120px auto",
              padding: "0 16px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "1.6rem", marginBottom: "12px", color: "#fff" }}>
              About page content not found
            </h1>
            <p style={{ color: "#aaa", fontSize: "0.95rem" }}>
              Create and publish documents in Sanity Studio for each section.
            </p>
          </section>
        )}

        {data && (
          <>
            {data.hero?.hero && <AboutHero hero={data.hero.hero} />}

            {data.stats?.stats && <StatsStrip stats={data.stats.stats} />}

            {data.partners?.partners && (
              <PartnerLogos partners={data.partners.partners} />
            )}

            {(data.missionVision?.mission || data.missionVision?.vision) && (
              <MissionVision
                mission={data.missionVision.mission}
                vision={data.missionVision.vision}
              />
            )}

            {data.coreValues?.values && (
              <CoreValues
                title={data.coreValues.title}
                values={data.coreValues.values}
              />
            )}

            {/* company journey timeline – placed directly below CoreValues */}
            {data.timeline?.timelineItems && data.timeline.timelineItems.length > 0 && (
              <AboutTimeline data={data.timeline} />
            )}

            {data.techPartners?.partners && (
              <TechnologyPartners
                title={data.techPartners.title}
                partners={data.techPartners.partners}
              />
            )}

            {data.cta && (
              <CallToAction
                heading={data.cta.heading}
                buttonText={data.cta.buttonText}
                buttonLink={data.cta.buttonLink}
              />
            )}

            {data.testimonials?.testimonials && (
              <Testimonials
                title={data.testimonials.title}
                testimonials={data.testimonials.testimonials}
              />
            )}

            {data.awards?.awards && (
              <Awards title={data.awards.title} awards={data.awards.awards} />
            )}

            {data.leadership?.members && (
              <Leadership
                title={data.leadership.title}
                members={data.leadership.members}
                ctaText={data.leadership.ctaText}
                ctaLink={data.leadership.ctaLink}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
