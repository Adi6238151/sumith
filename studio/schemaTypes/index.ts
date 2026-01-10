import { type SchemaTypeDefinition } from 'sanity'
import heroSection from './heroSection'
import solutionCarousel from './solutionCarousel'
import sumithBenefits from './sumithBenefits'
import itmssServiceGrid from './itmssServiceGrid'
import customerLogoGrid from './customerLogoGrid'
import customSectionHeader from './customSectionHeader'
import qualityOfLifeTechnology from './qualityOfLifeTechnology'
import itsBusHero from './itsBusHero'
import busSolutionImageRow from './busSolutionImageRow'
import metroRailSectionHeader from './metro-rail/metroRailSectionHeader'
import scopeOfWorkTiles from './metro-rail/scopeOfWorkTiles'
import safetyTabSection from './metro-rail/safetyTabSection'
import passengerDisplaySection from './metro-rail/passengerDisplaySection'
import AirportSectionHeader from './Airport/AirportSectionHeader'
import footerSettings from './footer/FooterSettings'




// About Page Schemas
import aboutPage from './about/AboutHero'
import aboutStats from './about/AboutStats'
import aboutPartners from './about/AboutPartners'
import aboutMissionVision from './about/AboutMissionVision'
import aboutCTA from './about/AboutCTA'
import aboutTestimonials from './about/AboutTestimonials'
import aboutCoreValues from './about/AboutCoreValues'
import aboutTechPartners from './about/AboutTechPartners'
import aboutAwards from './about/AboutAwards'
import aboutLeadership from './about/AboutLeadership'

//Products
import { blockContent } from './products/blockContent'
import { product } from './products/product'

//contact
import emailSettings from './contact/emailSettings'
import contactTopic from './contact/contactTopic'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    solutionCarousel,
    sumithBenefits,
    itmssServiceGrid,
    customerLogoGrid,
    customSectionHeader,
    qualityOfLifeTechnology,
    itsBusHero,
    busSolutionImageRow,
    metroRailSectionHeader,
    scopeOfWorkTiles,
    safetyTabSection,
    passengerDisplaySection,
    AirportSectionHeader,
    // About page schemas
    aboutPage,
    aboutStats,
    aboutPartners,
    aboutMissionVision,
    aboutCoreValues,
    aboutTechPartners,
    aboutCTA,
    aboutTestimonials,
    aboutAwards,
    aboutLeadership,
    footerSettings,
    // Products
    product,
    blockContent,
    // Contact
    emailSettings,
    contactTopic,

  ],
}
