import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickySidebar from "@/components/StickySidebar";
import ProductHero from "@/components/products/ProductHero";
import SolutionsShowcase from "@/components/products/SolutionsShowcase";
import { client } from "@/sanity/lib/client";

async function getHero() {
  return client.fetch(`*[_type == "productHero"][0]{
    label,
    title,
    subtitle,
    heroImage,
    backgroundColor
  }`);
}

async function getSolutions() {
  return client.fetch(`*[_type == "solution"] | order(order asc){
    _id,
    title,
    theme,
    image,
    imagePosition,
    exploreLink
  }`);
}

export default async function ProductsPage() {
  const [hero, solutions] = await Promise.all([
    getHero(),
    getSolutions(),
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020824" }}>
      <Navigation />

      <main>
        {/* HERO (listing page hero) */}
        <ProductHero hero={hero} />

        {/* OUR SOLUTIONS */}
        <section style={{ backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
            <SolutionsShowcase solutions={solutions} />
          </div>
        </section>
      </main>

      <StickySidebar />
      <Footer />
    </div>
  );
}
