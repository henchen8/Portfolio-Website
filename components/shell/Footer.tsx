import Image from "next/image";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import emailIcon from "@/assets/icons/email.png";
import linkedinIcon from "@/assets/icons/linkedin.png";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Logo size={50} className="footer-logo-img" />
        </div>
        <div className="footer-social">
          <a
            href={site.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="email-icon"
            aria-label="Send email via Gmail"
          >
            <Image
              src={emailIcon}
              alt=""
              width={56}
              height={56}
              className="email-icon-img"
            />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-icon"
            aria-label="LinkedIn profile"
          >
            <Image
              src={linkedinIcon}
              alt=""
              width={40}
              height={40}
              className="linkedin-icon-img"
            />
          </a>
        </div>
        <p>&copy; 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
