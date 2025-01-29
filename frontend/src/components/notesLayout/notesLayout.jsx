import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="pt-34 md:pt-20">
        <Header />
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomeLayout;
