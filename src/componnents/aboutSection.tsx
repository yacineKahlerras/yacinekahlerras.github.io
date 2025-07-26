import { useIsSocialsContext } from "@/utils/isSocialsContext";

export default function AboutSection() {
  const isSocials = useIsSocialsContext();

  return (
    <section id="about" className="about">
      <div className="about-center">
        <h3>About</h3>
        {isSocials ? (
          <p>
            I work with startups to build stuff that actually works — products
            that look good, feel smooth, and actually get users to stick around.
            When I’m not deep in code, I’m usually messing with new tools or
            frameworks (half out of curiosity, half because FOMO is real). I’m
            big on clean interfaces, smooth user experiences, and anything that
            makes people go “yo, this is nice.” Always learning, always
            tinkering, that’s the vibe.
          </p>
        ) : (
          <>
            <p>
              My name is Yacine Kahlerras I’ve been into programming since my
              early teens and have been working hard to sharpen my skills. I’m
              all about HTML, CSS, JavaScript, and the latest frameworks like
              Next.js, Express.js, MongoDB, Firebase, and Tailwind.
            </p>
            <p>
              I love making awesome, responsive websites that run smoothly and
              look great on any browser. I keep up with the latest trends in web
              dev and always look for ways to level up my workflow and tackle
              new challenges.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
