import React from "react";
import { SiX, SiGithub, SiLinkedin } from "react-icons/si";

import Link from "next/link";
import Image from "next/image";
function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  const footerLinks = [
    {
      name: "Twitter",
      link: "https://twitter.com/shiva_123_",
      icon: (
        <SiX
          aria-label="Follow us on Twitter"
          title="Twitter(External Link)"
        />
      ),
      hover: " text-xl  text-gray-200 cursor-pointer hover:text-purple-500 ",
    },
    {
      name: "GitHub",
      link: "https://github.com/ShivaKrishna-07",
      icon: (
        <SiGithub
          aria-label="Follow us on GitHub"
          title="GitHub(External Link)"
        />
      ),
      hover: " text-xl  text-gray-200 cursor-pointer hover:text-purple-500 ",
    },
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/shivaaa07/",
      icon: (
        <SiLinkedin
          aria-label="Follow us on LinkedIn"
          title="LinkedIn(External Link)"
        />
      ),
      hover: " text-xl  text-gray-200 cursor-pointer hover:text-purple-700 ",
    },
  ];

  const footerdocsLinks = [
    {
      title: "Documentation",
      child: [
        {
          name: "Contributing Guide",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md",
        },
        {
          name: "Add projects via GitHub",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md#how-to-add-your-projects-to-projectshut",
        },
        {
          name: "Run the project locally",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/contributing.md#note-alternatively-if-you-prefer-to-run-the-project-locally-follow-these-steps",
        },
      ],
    },
  ];

  const footerServiceLinks = [
    {
      title: "License",
      child: [
        {
          name: "MIT License",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/LICENSE",
        },
        {
          name: "Code of Conduct",
          link: "https://github.com/priyankarpal/ProjectsHut/blob/main/CODE_OF_CONDUCT.md",
        },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-gray-800 py-24">
      <div className="mx-auto max-w-screen-xl pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-4">
          <div className="text-center lg:text-left">
            <div className="flex h-10 items-center justify-center lg:justify-start text-white rounded-lg font-extrabold text-2xl">
              Prep <span className="text-primary">.</span>
            </div>
            <p className="mt-4 text-center text-gray-200 dark:text-gray-400 lg:text-left lg:text-lg">
            Prep is a one-stop platform for all your exam preparation needs – notes, syllabus, PYQs, and results in one place.
            </p>

            <div className="mt-6 flex justify-center lg:justify-start gap-4">
              {footerLinks.map((footerLink) => (
                <li key={footerLink.link}>
                  <Link
                    href={footerLink.link}
                    target="_blank"
                    className={footerLink.hover}
                    aria-label={`footer link of ${footerLink.link}`}
                  >
                    {footerLink.icon}
                  </Link>
                </li>
              ))}
            </div>
          </div>

        </div>
        <div className="mt-10 pt-8 dark:border-gray-800 text-center lg:text-centerlg:text-left">
          <p className="text-gray-200 mx-auto lg:mx-0">
            © Prep {getCurrentYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer >
  );
}

export default Footer;