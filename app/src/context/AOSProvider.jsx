"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
