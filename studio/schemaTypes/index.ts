import { type SchemaTypeDefinition } from 'sanity'
import heroSection from './heroSection'
import solutionCarousel from './solutionCarousel'
import sumithBenefits from './sumithBenefits'
import itmssServiceGrid from './itmssServiceGrid'
import customerLogoGrid from './customerLogoGrid'
import customSectionHeader from './customSectionHeader'
import itsBusHero from './itsBusHero'  // <--- Add this if you need the header CMS type
import busSolutionImageRow from './busSolutionImageRow'
import metroRailSectionHeader from './metro-rail/metroRailSectionHeader'
import scopeOfWorkTiles from "./metro-rail/scopeOfWorkTiles"
import safetyTabSection from './metro-rail/safetyTabSection'
import passengerDisplaySection from './metro-rail/passengerDisplaySection'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    solutionCarousel,
    sumithBenefits,
    itmssServiceGrid,
    customerLogoGrid,
    customSectionHeader,
    itsBusHero,
    busSolutionImageRow,
    metroRailSectionHeader, // <--- Add this line if you have the CMS header component
    scopeOfWorkTiles,
    safetyTabSection,
    passengerDisplaySection,
  ],
}
