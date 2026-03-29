import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "AI Interview Platform",
    category: "Web Application",
    tools: "Next.js, React, Three.js, Tailwind CSS",
    image: "/images/project_ai_platform.png",
  },
  {
    name: "C++ DSA/CP Curriculum",
    category: "Education",
    tools: "C++, STL, Algorithms, Data Structures",
    image: "/images/project_dsa_curriculum.png",
  },
  {
    name: "Interactive India Map",
    category: "Frontend Development",
    tools: "HTML, CSS, JavaScript, SVG",
    image: "/images/project_india_map.png",
  },
  {
    name: "Online Store Backend",
    category: "Backend Development",
    tools: "Node.js, Express, MongoDB",
    image: "/images/project_backend.png",
  },
  {
    name: "Sorting Visualizer",
    category: "Algorithm Visualization",
    tools: "React, CSS Animations",
    image: "/images/project_visualizer.png",
  },
  {
    name: "Personal Portfolio",
    category: "Web Design",
    tools: "React, GSAP, TypeScript",
    image: "/images/project_portfolio.png",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    const padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
