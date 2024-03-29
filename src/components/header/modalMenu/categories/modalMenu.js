import { getShopUrlForCategoryId } from "@/helpers/routedHelper";
import { useRouter } from "next/router";
import ModalItem from "../modalItem";

export default function ModalMenu({ categoriesTrees, setOpen, closeModal }) {
  const {
    query,
  } = useRouter();

  const parentCategories = categoriesTrees.map((categoryTree) => {
    return { id: categoryTree.id, name: categoryTree.name };
  });

  return (
    <div className="z-50 absolute left-0 w-full md:max-w-screen-sm md:w-screen mt-2 origin-top-right">
      <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentCategories.map((category) => {
            const categoryUrl = getShopUrlForCategoryId(query.business, category.id);
            return (
              <ModalItem
                key={category.id}
                title={category.name}
                url={categoryUrl}
                setOpen={setOpen}
                closeModal={closeModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
