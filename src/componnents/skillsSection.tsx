import { skillsList } from "@/data/skillsList";

export default function SkillsSection() {
  return (
    <section id="skills" className="skills">
      <div className="skills-center">
        <h3>Skills</h3>
        <ul className="tools-list">
          {skillsList.map((s) => (
            <li key={s.name} id={s.name}>
              <img src={`./images/skills/${s.img}`} alt={s.name} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
