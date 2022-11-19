import React from "react";
import Footer from "./Footer";
type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
