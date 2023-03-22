import CategoriesDisclosure from "./CategoriesDisclosure";
import SectionDisclosure from "./sectionDisclosure";

export default function Sidebar({ categories, selectedCategory }) {
  return (
    <form className="hidden lg:block">
      {/* <ul
        role="list"
        className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        {categories.map((category) => (
          <li key={category.name}>
            <a href={category.href}>{category.name}</a>
          </li>
        ))}
      </ul> */}

      {categories.map((category) => {
        console.log("hola?", category);

        const defaultOpen = category.children.some(
          (child) => child.id == selectedCategory
        );

        return (
          <CategoriesDisclosure
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            defaultOpen={defaultOpen}
          />
        );
      })}
      {/* {filters.map((section) => (
        <SectionDisclosure key={section.id} section={section} />
      ))} */}
    </form>
  );
}
