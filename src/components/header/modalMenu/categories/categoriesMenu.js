import { Transition } from "@headlessui/react";
import ModalMenu from "./modalMenu";

export default function CategoriesMenu({
  open,
  setModalOpen,
  categoriesTrees,
  closeModal,
}) {

  const handleOpen = () => {
    if (open) {
      setModalOpen("");
      closeModal()
    } else {
      setModalOpen("categories");
    }
  };

  return (
    <div
      onMouseEnter={() => setModalOpen("categories")}
      onMouseLeave={() => setModalOpen("")}
      className="relative"
    >
      <button
        onClick={() => handleOpen()}
        className={`outline:none flex flex-row text-gray-900 bg-gray-200 
                    items-center w-full px-4 py-2 mt-2 text-sm font-semibold
                    text-left bg-white rounded-lg
                    md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900
                    hover:bg-gray-200 focus:bg-gray-200 focus:outline-none outline:none`}
      >
        <span>Categorías</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <Transition
        show={open}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <ModalMenu
          categoriesTrees={categoriesTrees}
          setOpen={() => setModalOpen("categories")}
          closeModal={closeModal}
        />
      </Transition>
    </div>
  );
}
