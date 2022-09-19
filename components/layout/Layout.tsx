import React from "react";
import Footer from "./Footer";
import NavbarComponent from "./NavbarComponent";
type Props = {
  children: JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <div>
      <NavbarComponent />
      <div className="max-w-[1280px] mx-auto">{children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
