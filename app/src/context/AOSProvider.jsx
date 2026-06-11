"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Initializes AOS ("Animate On Scroll") once on mount so elements with
// data-aos attributes anywhere in the app fade/slide in as they scroll into view.
export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      // once: true,
      offset: 40,
    });
  }, []);

  return <>{children}</>;
}
