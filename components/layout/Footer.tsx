import { Collapse, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Logo } from "../../assets/Logo";
function Footer() {
  const [isMobile, setIsMobile] = useState(true);

  const Mobile = () => {
    if (typeof window !== "undefined") {
      console.log(window.innerWidth);
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
    window.addEventListener("resize", () => setIsMobile(Mobile()));

    /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
  }, []);
  if (isMobile) {
    return (
      <div className="flex flex-col">
        <Collapse.Group>
          <Collapse title="Option A">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
            </div>
          </Collapse>
          <Collapse title="Option A">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
            </div>
          </Collapse>
          <Collapse title="Option A">
            <div className="flex flex-col items-end mr-3 ">
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
              <Link href="#">Item to be chosen</Link>
            </div>
          </Collapse>
        </Collapse.Group>
        <div className="flex flex-col items-center justify-center my-10">
          <div className="flex items-center">
            <Logo />
            <h1>Stack Metrics</h1>
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
          <div
            className="flex flex-col items-center justify-center
          "
          >
            <div className="flex items-center">
              <Logo />
              <h1 className="text-2xl font-bold">SCRIP MET</h1>
            </div>
            <div className="flex flex-col">
              <h2>ul. Czyżewska 116</h2>
              <h2>02-908, Warszawa</h2>
              <h2>+48 69 149 70 34</h2>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">Category</h1>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">Category</h1>

            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="font-bold text-xl mb-3">Category</h1>

            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
          </div>
          <div className="flex flex-col items-end mr-10 ">
            <h1 className="font-bold text-xl mb-3">Category</h1>

            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
            <Link href="#">Item</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
