import ProductFeatureSection from "@/components/products/sections/ProductFeatureSection";
import ProductSpecsSection from "@/components/products/sections/ProductSpecsSection";

export default function ProductSectionRenderer({ product }) {
  // Phase 1 fallback if sections[] not created yet:
  const hasBuilder = Array.isArray(product.sections) && product.sections.length > 0;

  if (!hasBuilder) {
    return (
      <>
        <ProductFeatureSection product={product} />
        <ProductSpecsSection product={product} />
      </>
    );
  }

  return (
    <>
      {product.sections.map((section) => {
        if (section._type === "featureSection") {
          return <ProductFeatureSection key={section._key} product={product} section={section} />;
        }
        if (section._type === "specSection") {
          return <ProductSpecsSection key={section._key} product={product} section={section} />;
        }
        return null;
      })}
    </>
  );
}
