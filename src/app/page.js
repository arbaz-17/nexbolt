import HeroWaitlist from "./components/sections/hero/HeroWaitlist"
import TextContentBlock from "./components/overlays/TextContentBlock"
import TechStackGrid from "./components/sections/grid/TechStackGrid"
import { FeaturesSection } from "./components/sections/grid/FeaturesSection"
import { RoadmapSection } from "./components/sections/grid/RoadmapSection"
import PricingTabs from "./components/sections/grid/PricingTabs"


export default function Home() {
  return (
    <>
      <HeroWaitlist />
       <TextContentBlock
        title="MODERN STACK, PROVEN FOUNDATION"
        description="Built on the newest, production-hardened tools you can trust to run fast today and grow tomorrow."
        align="center"
      />
      <TechStackGrid />
      <TextContentBlock
        title="BUILT FOR DEVELOPERS"
        description="Ship production SaaS fast with opinionated essentials, swappable integrations, and battle-tested patterns that stay out of your way."
        align="center"
      />
      <FeaturesSection />
            <TextContentBlock
        title="NEXTBOLT WORK PROGRESS"
        description="From ✅ shipped to ⏳ in progress, see what’s usable now and what’s around the corner as we march toward a stable, scalable v1."
        align="center"
      />
      <RoadmapSection />
      <TextContentBlock
        title="PICK YOUR KIT, BUILD YOUR SAAS"
        description="Save weeks of work. Pay once. Ship unlimited projects at bolt speed."
        align="center"
      />
      <PricingTabs />
    </>
  )
}