import { contactLinksData } from "@/data/contactLinks";
import { useIsSocialsContext } from "@/utils/isSocialsContext";

export default function ContactSection() {
  const isSocials = useIsSocialsContext();
  const projectsList = isSocials
    ? contactLinksData.personal
    : contactLinksData.pro;
  return (
    <section id="contact" className="contact">
      <div className="contact-center">
        <h3>Contact</h3>
        <ul className="contact-links">
          {projectsList.map((c) => (
            <li key={c.name}>
              <a
                className="contact-item"
                target="_blank"
                rel="noreferrer"
                href={c.link}
              >
                <img src={`./images/contact/${c.img}`} alt={c.name} />
                <span>{c.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
