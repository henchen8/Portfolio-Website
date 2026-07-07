"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lastY = useRef(0);

  // Single scroll handler: hide on scroll-down past a threshold, show on scroll-up.
  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY.current) > 10) {
          setHidden(y > lastY.current && y > 150);
          lastY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", `/${hash}`);
    }
    // Off home: let the Link navigate to /#hash; the browser handles the anchor.
  };

  return (
    <nav className={`navbar${hidden ? " navbar-hidden" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="nav-logo" aria-label={`${site.name} — home`}>
          <Logo size={40} className="logo-icon" />
          {site.name}
        </Link>
        <ul className="nav-menu">
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#experience"
              className="nav-link"
              onClick={(e) => handleHashNav(e, "#experience")}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              href="/#projects"
              className="nav-link"
              onClick={(e) => handleHashNav(e, "#projects")}
            >
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
