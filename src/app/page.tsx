import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import BlogGrid from "@/components/BlogGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductShowcase />
      <FeaturedProducts />
      <BlogGrid />
    </main>
  );
}
