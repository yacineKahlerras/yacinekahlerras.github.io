import { skillsList } from "@/data/skillsList";
import { hobbiesList } from "@/data/hobbiesList";
import { useIsSocialsContext } from "@/utils/isSocialsContext";

export default function SkillsSection() {
  const isSocials = useIsSocialsContext();
  const title = isSocials ? "Hobbies" : "Skills";
  const list = isSocials ? hobbiesList : skillsList;

  return (
    <section id="skills" className="skills">
      <div className="skills-center">
        <h3>{title}</h3>
        <ul className="tools-list">
          {list.map((s) => (
            <li key={s.name} id={s.name}>
              <img src={`./images/skills/${s.img}`} alt={s.name} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
