import { Github, Linkedin, Mail, MapPin, FileText } from "lucide-react";
import { socialLinks } from "./portfolio";

export const contactData = [
  {
    label: "LinkedIn",
    value: "/in/tarannum2504",
    Icon: Linkedin,
    href: socialLinks.linkedin,
  },
  {
    label: "GitHub",
    value: "@Tarannum2504",
    Icon: Github,
    href: socialLinks.github,
  },
  {
    label: "Email",
    value: socialLinks.email,
    Icon: Mail,
    href: `mailto:${socialLinks.email}`,
  },
  {
    label: "Location",
    value: socialLinks.location,
    Icon: MapPin,
    href: null,
  },
  {
    label: "Resume",
    value: "Download PDF",
    Icon: FileText,
    href: socialLinks.resume,
    isResume: true,
  },
];
