import { client } from "@/sanity/lib/client";
import ProductPageClient from "@/components/products/ProductPageClient";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickySidebar from "@/components/StickySidebar";

async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    intro,
    image,
    "sections": sections[]{
      _key,
      _type,
      title,
      description,
      image,
      position, // 'left' or 'right'
      items[]   // for specs
    }
  }`;
  
  // Added revalidate: 0 to disable cache and see updates immediately
  return client.fetch(query, { slug }, { next: { revalidate: 0 } });
}

export default async function ProductDetailPage({ params }) {
  // Await params before accessing slug (Next.js 15+ requirement)
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-32 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <main>
        {/* All interaction logic lives in the Client Component */}
        <ProductPageClient product={product} />
      </main>
      <StickySidebar />
      <Footer />
    </div>
  );
}
