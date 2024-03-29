"use client";
import { useCallback, useMemo, useState } from "react";

import Nav from "./nav";
import useScrollDirection from "../helpers/useScrollDirection";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBusinessHome } from "@/helpers/routedHelper";
import CartSvgIcon from "../common/CartSvgIcon";

export default function Header({ companyInfo }) {
  const {
    query: { business },
  } = useRouter();
  const scrollDirection = useScrollDirection();

  const [modalOpen, setModalOpen] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const closeModal = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const navItems = useMemo(() => {
    const items = [
      {
        id: "contact",
        name: "Contacto",
        link: "#",
      },
      {
        id: "us",
        name: " ¿Quienes Somos?",
        link: "#",
      },
    ];

    if (
      !!companyInfo?.company?.configurations?.generalInformation?.links
        ?.instagram &&
      companyInfo.company.configurations.generalInformation.links.instagram.includes(
        "instagram"
      )
    ) {
      items.push({
        id: "social",
        name: "Redes Sociales",
        link: "#",
        options: [
          {
            id: "instagram",
            name: "Instagram",
            url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
          },
        ],
      });
    }
    return items;
  }, [companyInfo]);

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } h-16 transition-all duration-500
        flex justify-between  mx-auto bg-white
        shadow z-50 header-shadow`}
    >
      <div className="w-full">
        <div className="antialiased bg-gray-100 dark-mode:bg-gray-900">
          <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
              <div className="flex flex-row items-center justify-between p-4">
                <Link
                  href={getBusinessHome(business)}
                  className="text-lg font-semibold tracking-widest text-secondary-700 uppercase rounded-lg dark-mode:text-white focus:outline-none outline:none"
                >
                  {companyInfo?.company?.name}
                </Link>
                <div className="flex flex-row items-center md:hidden">
                  <div className="w-[44px] h-[40px] block">
                    {/* <CartSvgIcon  itemsCount={1}/> */}
                  </div>
                  <div className="w-[44px] h-[40px] flex flex-row items-center justify-center">
                    <button
                      className="ml-2 outline:none rounded-lg md:hidden focus:outline-none"
                      onClick={() => {
                        setMenuOpen((prevState) => !prevState);
                      }}
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="w-6 h-6"
                      >
                        {!menuOpen ? (
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          ></path>
                        ) : (
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <Nav
                navItems={navItems}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                closeModal={() => closeModal()}
                menuOpen={menuOpen}
                companyInfo={companyInfo}
              ></Nav>

              <div className="small:hidden">
                <div className="w-[44px] h-[40px] block">
                  {/* <CartSvgIcon  itemsCount={1}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
