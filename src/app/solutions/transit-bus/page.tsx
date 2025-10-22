import Navigation from "@/components/Navigation";
import CustomSectionHeader from "@/components/transit-bus/CustomSectionHeader";
import ITSBusHero from "@/components/transit-bus/ITSBusHero";
import BusSolutionImageRow from "@/components/transit-bus/BusSolutionTilesRow";
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

export default async function TransitBusITSPage() {
  const sectionHeaderData = await sanity.fetch(customSectionHeaderQuery);
  const itsBusHeroData = await sanity.fetch(itsBusHeroQuery);
  const busSolutionImageRowData = await sanity.fetch(busSolutionImageRowQuery);

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
      </main>
    </>
  );
}
