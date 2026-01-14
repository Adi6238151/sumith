import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomSectionHeader from "@/components/transit-bus/CustomSectionHeader";
import ITSBusHero from "@/components/transit-bus/ITSBusHero";
import BusSolutionImageRow from "@/components/transit-bus/BusSolutionTilesRow";
import QualityOfLifeTechnology from "@/components/transit-bus/QualityOfLifeTechnology";
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
      "image": image.asset->url,   // <-- resolve to URL
      listItems
    },
    seo{
      metaTitle,
      metaDescription
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

      {/* Shared ITS background via global .its-page-shell class */}
      <main className="its-page-shell">
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
            {qualityOfLifeTechnologyData && (
              <QualityOfLifeTechnology
                title={qualityOfLifeTechnologyData.title}
                tabs={qualityOfLifeTechnologyData.tabs}
              />
            )}

      </main>

      <Footer />
    </>
  );
}
