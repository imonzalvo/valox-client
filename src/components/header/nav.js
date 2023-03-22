import { useRouter } from "next/router";
import CategoriesMenu from "./categoriesMenu";

const NAV_ITEMS = [
  {
    id: "contact",
    name: "Contact",
    link: "#",
  },
  {
    id: "we",
    name: " ¿Quienes Somos?",
    link: "#",
  },
  {
    id: "social",
    name: "Redes Sociales",
    link: "#",
  },
];

export default function Nav({ open, setOpen, companyInfo, menuOpen, closeModal }) {
  const categoriesTrees = companyInfo?.categoriesTrees;
  return (
    <nav
      className={`
      ${menuOpen ? "flex" : "small:hidden"}
      flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-start md:flex-row `}
    >
      <CategoriesMenu
        open={open}
        setOpen={setOpen}
        categoriesTrees={categoriesTrees}
        closeModal={closeModal}
      />
      {NAV_ITEMS.map((navItem) => (
        <a
          className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:outline-none outline:none"
          href={navItem.link}
          key={navItem.id}
        >
          {navItem.name}
        </a>
      ))}
    </nav>
  );
}
