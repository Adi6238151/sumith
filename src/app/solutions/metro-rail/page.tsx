import Navigation from "@/components/Navigation";
import MetroRailSectionHeader from "@/components/metro-rail/MetroRailSectionHeader";
import ScopeOfWorkTiles from "@/components/metro-rail/ScopeOfWorkTiles";
import SafetyTabsSection from "@/components/metro-rail/SafetyTabsSection";
import PassengerDisplaySection from "@/components/metro-rail/PassengerDisplaySection"; // <-- Case corrected!
import { sanity } from "@/lib/sanity.client";

const metroRailSectionHeaderQuery = `
  *[_type=="metroRailSectionHeader"][0]{
    heading,
    subtitle1,
    subtitle2,
    "image": image.asset->url,
    seo
  }
`;
const scopeOfWorkTilesQuery = `
  *[_type=="scopeOfWorkTiles"][0]{
    heading,
    tiles[]{ title },
    seo
  }
`;

const safetyTabsSectionQuery = `
  *[_type=="safetyTabSection"][0]{
    tabs[]{
      tabTitle,
      title,
      description,
      "image": image.asset->url
    },
    seo
  }
`;

const passengerDisplaySectionQuery = `
  *[_type=="passengerDisplaySection"][0]{
    heading,
    description,
    displays[]{
      "image": image.asset->url,
      caption
    },
    seo
  }
`;

export default async function MetroRailSolutionPage() {
  const headerData = await sanity.fetch(metroRailSectionHeaderQuery);
  const scopeOfWorkData = await sanity.fetch(scopeOfWorkTilesQuery);
  const safetyTabsData = await sanity.fetch(safetyTabsSectionQuery);
  const passengerDisplaySectionData = await sanity.fetch(passengerDisplaySectionQuery);

  return (
    <>
      <Navigation />
      <main
        style={{
          background: "#171f2e",
          minHeight: "100vh",
          width: "100%",
          paddingTop: "110px",
          paddingBottom: "80px",
          overflowX: "hidden"
        }}
      >
        {/* MetroRailSectionHeader */}
        <MetroRailSectionHeader
          seo={headerData?.seo}
          heading={headerData?.heading}
          subtitle1={headerData?.subtitle1}
          subtitle2={headerData?.subtitle2}
          image={headerData?.image}
        />

        {/* ScopeOfWorkTiles */}
        <ScopeOfWorkTiles
          heading={scopeOfWorkData?.heading}
          tiles={scopeOfWorkData?.tiles || []}
          seo={scopeOfWorkData?.seo}
        />
        
        {/* SafetyTabsSection */}
        <SafetyTabsSection
          tabs={safetyTabsData?.tabs || []}
          seo={safetyTabsData?.seo}
        />

        {/* PassengerDisplaySection */}
        <PassengerDisplaySection
          heading={passengerDisplaySectionData?.heading}
          description={passengerDisplaySectionData?.description}
          displays={passengerDisplaySectionData?.displays || []}
          seo={passengerDisplaySectionData?.seo}
        />

        {/* Add further CMS-powered sections/components below */}
      </main>
      {/* Use app/globals.css or CSS Modules for global styles if needed */}
    </>
  );
}
