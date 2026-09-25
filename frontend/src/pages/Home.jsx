import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Hero from "@/components/hero/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  const { content } = useContent();
  usePageMeta({
    title: "Minhaz Alam — Data Engineering",
    description: "Selected data engineering projects and preparation resources by Minhaz Alam.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <FeaturedWork projects={content.projects.projects} />
      <ContactCTA />
    </>
  );
}
