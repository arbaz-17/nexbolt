import HeroWaitlist from "./components/sections/hero/HeroWaitlist"
import TextContentBlock from "./components/overlays/TextContentBlock"
import TechStackGrid from "./components/sections/grid/TechStackGrid"
import { FeaturesSection } from "./components/sections/grid/FeaturesSection"
import { FeatureProgressSection } from "./components/sections/grid/RoadmapSection"
import PricingTabs from "./components/sections/grid/PricingTabs"
import AboutMe from "./components/sections/grid/AboutMe"
import HeadlineBlock from "./components/overlays/HeadlineBlock"
import FAQSection from "./components/sections/grid/FAQSection"
import HireMeSection from "./components/sections/grid/HireMe"

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
        title="PICK YOUR KIT, BUILD YOUR SAAS"
        description="Save weeks of work. Pay once. Ship unlimited projects at bolt speed."
        align="center"
      />
      <PricingTabs />
                  <TextContentBlock
        title="WORK PROGRESS"
        description="The fnish line is in sight. Track every feature progressing to launch."
        align="center"
      />
      <FeatureProgressSection />
      <HeadlineBlock
        title="MEET THE BUILDER"
        align="center"
      />
      <AboutMe />
            <TextContentBlock
        title="FREQUENTLY ASKED QUESTIONS"
        description="Everything you need to know about Nextbolt and how it can help you ship your SaaS faster."
        align="center"
      />
      <FAQSection />
                  <TextContentBlock
        title="HIRE ME"
        description="If you’d rather skip the boilerplate and have me build your SaaS or app end-to-end. I’ll architect, ship, and launch it with the same patterns behind Nexbolt."
        align="center"
      />
      <HireMeSection />

    </>
  )
}