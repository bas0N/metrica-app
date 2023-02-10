import { Collapse, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Logo } from "../../assets/Logo";
function Footer() {
  const [isMobile, setIsMobile] = useState(true);

  const Mobile = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        return true;
      }
      return false;
    }
    console.log("window undefined");
    return false;
  };
  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
    setIsMobile(Mobile());
    window.addEventListener("resize", () => setIsMobile(Mobile()));

    /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
  }, []);
  if (isMobile) {
    return (
      <div className="flex flex-col">
        <Collapse.Group>
          <Collapse title="About Us">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Our Story</Link>
              <Link href="#">Our Team</Link>
              <Link href="#">Our Vision & Mission</Link>
            </div>
          </Collapse>
          <Collapse title="Resources">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Blog</Link>
              <Link href="#">Case Studies</Link>
            </div>
          </Collapse>
          <Collapse title="Help & Support">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">FAQs</Link>
              <Link href="#">Contact Us</Link>
              <Link href="#">Knowledge Base</Link>
            </div>
          </Collapse>
          <Collapse title="Legal">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy Policy </Link>
              <Link href="#">Disclaimer</Link>
            </div>
          </Collapse>
        </Collapse.Group>
        <div className="flex flex-col items-center justify-center mb-36">
          <div className="flex items-center">
            <Logo />
            <h1>Metrica</h1>
          </div>
          <div className="flex flex-col">
            <h2>ul. Czyżewska 116</h2>
            <h2>02-908, Warszawa</h2>
            <h2>+48 69 149 70 34</h2>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full  border-t-2  py-12 px-8">
        <div className="grid grid-cols-5 mt-5">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex items-center">
              <Logo />
              <h1 className="ml-2 text-3xl font-bold">METRICA</h1>
            </div>
            <div className="flex flex-col font-light">
              <h2>ul. Czyżewska 116</h2>
              <h2>02-908, Warszawa</h2>
              <h2>+48 69 149 70 34</h2>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">About Us</h1>
            <Link href="#">Our Story</Link>
            <Link href="#">Our Team</Link>
            <Link href="#">Our Vision & Mission</Link>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">Resources</h1>

            <Link href="#">Blog</Link>
            <Link href="#">Case Studies</Link>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">Help & Support</h1>

            <Link href="#">FAQs</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Knowledge Base</Link>
          </div>
          <div className="flex flex-col items-end mr-10 ">
            <h1 className="font-bold text-xl mb-3">Legal</h1>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy </Link>
            <Link href="#">Disclaimer</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
