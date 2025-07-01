import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "nextjs",
    "react",
    "cplusplus",
    "java",
    "css3",
    "sql",
    "javascript",
    "git",
    "html5",
    "github",
    "materialui",
    "tailwindcss",
    "php",
    "node",
    "express",
    "typescript",
    // "appwrite",
    // "materialui",
    // "shadcn",
    // "threejs",
    // "node"
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40} radius={170}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.png`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.png`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-150 cursor-pointer" />
);