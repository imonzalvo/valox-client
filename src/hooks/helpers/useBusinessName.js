import { useState, useEffect } from "react";

export const useBusinessName = () => {
  //   const [businessName, setBusinessName] = useState("");

  const IS_SERVER = typeof window === "undefined";
  let baseURL = IS_SERVER
    ? !!process.env.NEXT_PUBLIC_SITE_URL
    : window.location.hostname;

  // TODO: Hardcoded
  if (baseURL == "localhost") {
    baseURL = getFirstElementFromPath();
  }

  return baseURL;
};

const getFirstElementFromPath = () => {
  return location.pathname.split("/")[1];
};
