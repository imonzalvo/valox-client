import CategoriesMenu from "./modalMenu/categories/categoriesMenu";
import SimpleMenu from "./modalMenu/simpleMenu/simpleMenu";

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
    options: [
      {
        id: "instagram",
        name: "Instagram",
        url: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      },
    ],
  },
];

export default function Nav({
  modalOpen,
  setModalOpen,
  companyInfo,
  menuOpen,
  closeModal,
}) {
  const categoriesTrees = companyInfo?.categoriesTrees;
  return (
    <nav
      className={`
      ${menuOpen ? "flex" : "small:hidden"}
      flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-start md:flex-row `}
    >
      <CategoriesMenu
        open={modalOpen == "categories"}
        setModalOpen={setModalOpen}
        categoriesTrees={categoriesTrees}
        closeModal={closeModal}
      />
      {NAV_ITEMS.map((navItem) => {
        if (!!navItem.options) {
          return (
            <SimpleMenu
              key={navItem.id}
              open={modalOpen == navItem.name}
              name={navItem.name}
              setModalOpen={() => {
                setModalOpen(navItem.name);
              }}
              closeModal={() => setModalOpen("")}
              options={navItem.options}
            />
          );
        } else {
          return (
            <a
              className={`px-4 py-2 mt-2 text-sm font-semibold bg-transparent 
                          rounded-lg dark-mode:hover:bg-gray-600 
                          dark-mode:focus:bg-gray-600 dark-mode:focus:text-white
                          dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 
                          hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none 
                          focus:outline-none outline:none`}
              href={navItem.link}
              key={navItem.id}
            >
              {navItem.name}
            </a>
          );
        }
      })}
    </nav>
  );
}
