import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import useScrollDirection from "../helpers/useScrollDirection";

export const NavLink = tw.a`
  text-3xl my-2 lg:mx-6 lg:my-0
  font-black
  font-sans
  pb-1 border-b-2 border-transparent hover:border-primary-500 text-secondary-500
`;
export default ({}) => {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } h-16 transition-all duration-500
        flex justify-between items-center mx-auto bg-blue-100
        px-12 shadow z-50`}
    >
      <NavLink href="/">
        {/* <img src={logo} alt="logo" /> */}
        {process.env.NEXT_PUBLIC_BUSINESS_TITLE}
      </NavLink>
    </header>
  );
};
