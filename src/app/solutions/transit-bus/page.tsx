import Navigation from "@/components/Navigation";
import CustomSectionHeader from "@/components/transit-bus/CustomSectionHeader";
import ITSBusHero from "@/components/transit-bus/ITSBusHero";
import BusSolutionImageRow from "@/components/transit-bus/BusSolutionTilesRow";
import QualityOfLifeTechnology from "@/components/transit-bus/QualityOfLifeTechnology"; // <-- Adjust the path if your structure differs
import { sanity } from "@/lib/sanity.client";

const customSectionHeaderQuery = `
  *[_type=="customSectionHeader"][0]{
    heading,
    paragraph,
    icon,
    seo
  }
`;

const itsBusHeroQuery = `
  *[_type=="itsBusHero"][0]{
    tilesTitle,
    features[]{ label, "icon": icon.asset->url },
    "image": image.asset->url,
    seo
  }
`;

const busSolutionImageRowQuery = `
  *[_type=="busSolutionImageRow"][0]{
    images[]{
      title,
      "image": image.asset->url,
      alt,
      caption
    },
    seo
  }
`;

const qualityOfLifeTechnologyQuery = `
  *[_type == "qualityOfLifeTechnology"][0]{
    title,
    tabs[]{
      tabTitle,
      image,
      listItems
    }
  }
`;

export default async function TransitBusITSPage() {
  const sectionHeaderData = await sanity.fetch(customSectionHeaderQuery);
  const itsBusHeroData = await sanity.fetch(itsBusHeroQuery);
  const busSolutionImageRowData = await sanity.fetch(busSolutionImageRowQuery);
  const qualityOfLifeTechnologyData = await sanity.fetch(qualityOfLifeTechnologyQuery);

  return (
    <>
      <Navigation />
      <CustomSectionHeader
        seo={sectionHeaderData?.seo}
        heading={sectionHeaderData?.heading}
        paragraph={sectionHeaderData?.paragraph}
        icon={sectionHeaderData?.icon}
      />
      <main style={{ background: "#171f2e", minHeight: "100vh", width: "100vw" }}>
        <ITSBusHero
          tilesTitle={itsBusHeroData?.tilesTitle}
          features={itsBusHeroData?.features || []}
          image={itsBusHeroData?.image || "/images/bus its.png"}
          seo={itsBusHeroData?.seo}
        />
        <BusSolutionImageRow
          images={busSolutionImageRowData?.images || []}
          seo={busSolutionImageRowData?.seo}
        />

        {/* Add the new QualityOfLifeTechnology section */}
        {qualityOfLifeTechnologyData && (
          <div style={{
            background: "#fff",
            margin: "0 auto",
            marginTop: "36px",
            borderRadius: "18px",
            maxWidth: "1300px",
            padding: "2.5rem 2rem"
          }}>
            <QualityOfLifeTechnology
              title={qualityOfLifeTechnologyData.title}
              tabs={qualityOfLifeTechnologyData.tabs}
            />
          </div>
        )}
      </main>
    </>
  );
}
