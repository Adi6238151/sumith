import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AirportSectionHeader from "@/components/Airport/AirportSectionHeader";
import { sanity } from "@/lib/sanity.client";


const AirportSectionHeaderQuery = `
  *[_type=="AirportSectionHeader"][0]{
    heading,
    subtitle1,
    subtitle2,
    "image": image.asset->url,
    seo
  }
`


export default async function AirportSolutionsPage() {
  const headerData = await sanity.fetch(AirportSectionHeaderQuery);
 

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
        <AirportSectionHeader
          seo={headerData?.seo}
          heading={headerData?.heading}
          subtitle1={headerData?.subtitle1}
          subtitle2={headerData?.subtitle2}
          image={headerData?.image}
        />

        {/* Add further CMS-powered sections/components below */}
      </main>
      <Footer />
    </>
  );
}
