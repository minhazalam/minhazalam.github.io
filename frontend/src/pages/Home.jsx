import { usePageMeta } from "@/lib/seo";
import { useContent } from "@/context/ContentContext";
import Hero from "@/components/hero/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import ExperienceSection from "@/components/home/ExperienceSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  const { content } = useContent();
  usePageMeta({
    title: "Minhaz Alam — Senior Data Engineer | Data Platforms & Distributed Systems",
    description:
      "Portfolio of Minhaz Alam, Senior Data Engineer specializing in data platforms, distributed processing with Spark/PySpark, AWS, Databricks and cloud-native data systems.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <FeaturedWork projects={content.projects.projects} />
      <ExperienceSection experience={content.experience} />
      <ContactCTA />
    </>
  );
}
