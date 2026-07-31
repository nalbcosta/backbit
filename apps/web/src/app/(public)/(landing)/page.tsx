import { BoardPreview } from "@/components/landing/board-preview";
import { Cta } from "@/components/landing/cta";
import { DiscoveryPreview } from "@/components/landing/discovery-preview";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { ProductStory } from "@/components/landing/product-story";
import { WhyBackbit } from "@/components/landing/why-backbit";

export default function PublicHomePage() {
  return (
    <>
      <Hero />
      <ProductStory />
      <Features />
      <BoardPreview />
      <DiscoveryPreview />
      <WhyBackbit />
      <Cta />
    </>
  );
}
