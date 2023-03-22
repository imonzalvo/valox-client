import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export default function CategoriesDisclosure({ category, defaultOpen }) {
  const { push } = useRouter();
  const goToCategoryProducts = (categoryId) => {
    push(`?categoryId=${categoryId}`, ``, {
      shallow: true,
    });
  };

  return (
    <Disclosure
      as="div"
      key={category.id}
      className="py-2"
      defaultOpen={defaultOpen}
    >
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{category.name}</span>
              <span className="ml-6 flex items-center">
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-600 group-hover:text-gray-700"
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-4">
            <div className="space-y-1">
              {category.children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => goToCategoryProducts(category.id)}
                >
                  <label
                    key={child.id}
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                  >
                    {child.name}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
