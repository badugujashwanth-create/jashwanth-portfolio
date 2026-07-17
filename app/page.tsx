import { Capabilities } from "@/components/Capabilities";
import { EngineeringProcess } from "@/components/EngineeringProcess";
import { FeaturedJourney } from "@/components/FeaturedJourney";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProjectIndex } from "@/components/ProjectIndex";
import { RecruiterSnapshot } from "@/components/RecruiterSnapshot";
import { categories, featuredProjects, projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <RecruiterSnapshot />
      <FeaturedJourney projects={featuredProjects} />
      <Capabilities />
      <EngineeringProcess />
      <ProjectIndex projects={projects} categories={categories} />
      <section className="about shell" id="about" aria-labelledby="about-title">
        <p className="eyebrow">About the work</p>
        <h2 id="about-title">Product thinking, technical boundaries, and evidence.</h2>
        <p>
          Jashwanth&apos;s public work centers on complicated workflows: policy rules that need
          review, assistants that need permission boundaries, jobs that need observable state, and
          data answers that need evidence. The portfolio favors focused improvements and honest
          limitations over inflated feature counts.
        </p>
      </section>
      <Footer />
    </main>
  );
}
