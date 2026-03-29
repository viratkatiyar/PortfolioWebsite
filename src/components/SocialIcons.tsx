import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import MagneticLink from "./MagneticLink";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <MagneticLink
          href="https://www.codechef.com/users/viratkatiyar21"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiCodechef />
        </MagneticLink>
        <MagneticLink
          href="https://leetcode.com/u/viratkatiyar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLeetcode />
        </MagneticLink>
        <MagneticLink
          href="https://codeforces.com/profile/viratkatiyar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiCodeforces />
        </MagneticLink>
        <MagneticLink
          href="https://github.com/viratkatiyar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </MagneticLink>
        <MagneticLink
          href="https://www.linkedin.com/in/viratkatiyar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </MagneticLink>
        <MagneticLink
          href="https://twitter.com/viratkatiyar21"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </MagneticLink>
        <MagneticLink
          href="https://www.instagram.com/theviratkatiyar.exe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </MagneticLink>
        <MagneticLink
          href="https://youtube.com/@virat.katiyar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </MagneticLink>
      </div>
      <a className="resume-button" href="#">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
