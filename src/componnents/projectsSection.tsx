import { projects } from "@/data/siteData";

export default function ProjectsSection() {
  return (
    <section id="work" className="wrap">
      <div className="shead">
        <div>
          <div className="kick">Cargo manifest</div>
          <h2>The work</h2>
        </div>
      </div>
      <div className="ports">
        {projects.map((p) => (
          <a
            key={p.title}
            className="port"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="glass">
              {/* plain <img>: `output: export` cannot use the Next image optimiser */}
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
            </span>
            <span className="body">
              <span className="row1">
                <h3>{p.title}</h3>
                <span className="yr">{p.year}</span>
              </span>
              <p>{p.blurb}</p>
              <span className="chips">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </span>
              <span className="go">Visit site ↗</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
