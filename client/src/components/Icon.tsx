// Icon.tsx
import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";


import {
  
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaMedium,
  FaPinterest,

} from "react-icons/fa";
import { MdPictureAsPdf, MdImage } from "react-icons/md";
import { GiFilmSpool } from "react-icons/gi";
import { FiMusic } from "react-icons/fi";


// Define mappings for domain icons
const domainIcons: { [key: string]: JSX.Element } = {
  twitter: <FaSquareXTwitter />,  // Twitter blue
  xcom: <FaSquareXTwitter />,
  youtube: <FaYoutube color="#FF0000" />,  // YouTube red
  instagram: <FaInstagram color="#E4405F" />,  // Instagram pink
  facebook: <FaFacebook color="#1877F2" />,  // Facebook blue
  tiktok: <FaTiktok color="#25F4EE" />,  // TikTok teal
  github: <FaGithub color="#181717" />,  // GitHub dark gray
  linkedin: <FaLinkedin color="#0A66C2" />,  // LinkedIn blue
  google: <FcGoogle />,  // Google blue
  reddit: <FaReddit color="#FF4500" />,  // Reddit orange
  pinterest: <FaPinterest color="#E60023" />,  // Pinterest red
  medium: <FaMedium color="#00AB6C" />,  // Medium green
};

// Define mappings for file type icons
const fileTypeIcons: { [key: string]: JSX.Element } = {
  pdf: <MdPictureAsPdf color="#D32F2F" />,  // PDF red
  image: <MdImage color="#4CAF50" />,  // Image green
  video: <GiFilmSpool color="#FFC107" />,  // Video yellow
  audio: <FiMusic color="#2196F3" />,  // Audio blue
};


interface IconProps {
  domain?: string;
  fileType?: string;
}

const Icon: React.FC<IconProps> = ({ domain, fileType }) => {
  // Select the domain icon
  const domainIcon = domainIcons[domain?.toLowerCase() || ""] || null;

  // Select the file type icon
  const fileTypeIcon = fileTypeIcons[fileType?.toLowerCase() || ""] || null;

  // Return either domain icon, file type icon, or null if neither is provided
  return <div>{domainIcon || fileTypeIcon || <FcGoogle/>}</div>;
};

export default Icon;
