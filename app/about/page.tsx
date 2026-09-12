import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { experience } from "@/lib/site";
import { Reveal } from "@/components/shell/Reveal";
import golfPhoto from "@/assets/about/golf.jpg";
import fishingPhoto from "@/assets/about/fishing.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "A bit about Henry Chen — golf, food, fly fishing, and what he studies at Penn.",
  alternates: { canonical: "/about" },
};

const hobbies = [
  {
    title: "Golf",
    body: "I grew up competing on my high school golf team, and I'm now a Division I golfer at Penn. Still chasing a lower handicap and better ball-striking any chance I get.",
    image: golfPhoto,
    alt: "Henry with a teammate on the golf course, golf bag in hand",
  },
  {
    title: "Food",
    body: "I'm always on the hunt for a new restaurant worth the trip — always down to try something new. I've also been getting more into cooking at home, mostly as an excuse to eat well between trying new spots.",
  },
  {
    title: "Fishing & Outdoors",
    body: "Fly fishing gets me outside and off my screen. This one's from a trip to Iceland — landed this guy on a grey, overcast afternoon in the middle of nowhere.",
    image: fishingPhoto,
    alt: "Henry holding a fish he caught while fly fishing in Iceland",
  },
];

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="container about-container">
        <Reveal className="about-intro">
          <h1 className="about-title">About</h1>
          <p className="about-bio">
            Outside of school, I'm usually on a golf course, tracking down a
            new restaurant, or planning the next fishing trip. I study
            Electrical Engineering with a concentration in Controls and
            Robotics at Penn, where I'm also a Varsity Student-Athlete — but
            most of what makes up my day has nothing to do with either of
            those things.
          </p>
        </Reveal>
      </div>

      <div className="container">
        <div className="about-hobbies">
          {hobbies.map((hobby) => (
            <Reveal key={hobby.title} className="hobby-card">
              {hobby.image && (
                <div className="hobby-photo">
                  <Image
                    src={hobby.image}
                    alt={hobby.alt ?? ""}
                    placeholder="blur"
                    sizes="(max-width: 768px) 90vw, 30vw"
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
              )}
              <h3>{hobby.title}</h3>
              <p>{hobby.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container">
        <Reveal>
          <h2 className="section-title about-experience-title">
            Experience
          </h2>
        </Reveal>
        <ul className="about-experience-list">
          {experience.map((entry) => (
            <li key={`${entry.org}-${entry.period}`}>
              <Reveal className="about-experience-entry">
                <p className="about-experience-role">
                  {entry.role} · {entry.org}
                </p>
                <p className="about-experience-period">{entry.period}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="about-experience-note">
          More on my work is on the <Link href="/#experience">homepage</Link>.
        </p>
      </div>
    </section>
  );
}
