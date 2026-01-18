import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import BlogGrid from "@/components/BlogGrid";
import Gallery3D from "@/components/Gallery3D";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="bg-background overflow-hidden">
      <Hero />

      <Gallery3D />

      <ScrollReveal width="100%" direction="up">
        <ProductShowcase />
      </ScrollReveal>

      <ScrollReveal width="100%" direction="up" delay={0.2}>
        <FeaturedProducts />
      </ScrollReveal>

      <ScrollReveal width="100%" direction="up">
        <BlogGrid />
      </ScrollReveal>
    </main>
  );
}
