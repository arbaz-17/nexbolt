import HeroWaitlist from "./components/sections/hero/HeroWaitlist"
import TextContentBlock from "./components/overlays/TextContentBlock"
import TechStackGrid from "./components/sections/grid/TechStackGrid"
import { FeaturesSection } from "./components/sections/grid/FeaturesSection"

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
    </>
  )
}