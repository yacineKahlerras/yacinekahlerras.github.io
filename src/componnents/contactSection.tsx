import { contactLinksData } from "@/data/contactLinks";

export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="contact-center">
        <h3>Contact</h3>
        <ul className="contact-links">
          {contactLinksData.map((c) => (
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
