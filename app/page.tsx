import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
// "use client"

// import { useEffect, useState } from "react";

// type Project = {
//   _id: string;
//   title: string;
//   description: string;
//   technologies: string[];
//   github: string;
//   demo: string;
// };

// export default function Home() {
//   const [projects, setProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     fetch("/api/projects")
//       .then(res => res.json())
//       .then(setProjects);
//   }, []);

//   return (
//     <main>
//       <h1>My Portfolio Projects</h1>
//       <ul>
//         {projects.map(p => (
//           <li key={p._id}>
//             <h2>{p.title}</h2>
//             <p>{p.description}</p>
//             <p>Tech: {p.technologies.join(", ")}</p>
//             <a href={p.github}>GitHub</a> | <a href={p.demo}>Demo</a>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
