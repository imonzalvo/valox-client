export default function Step({ number, title, description, selected }) {
  return (
    <li className="w-[4.5rem] flex-auto">
      <div
        className={
          selected
            ? `flex cursor-pointer items-center pl-2 
        leading-[1.3rem] no-underline after:ml-2 
        after:h-px after:w-full after:flex-1 after:bg-secondary-300
        after:content-['']hover:bg-gray-300 focus:outline-none`
            : `flex cursor-pointer items-center pl-2 
        leading-[1.3rem] no-underline after:ml-2 
        after:h-px after:w-full after:flex-1 after:bg-gray-300
        after:content-['']hover:bg-gray-300 focus:outline-none`
        }
      >
        <span
          style={selected ? { fontWeight: "bold" } : {}}
          className={
            selected
              ? `my-6 mr-2 flex h-[1.938rem] w-[1.938rem] 
          items-center justify-center rounded-full bg-secondary-400
          text-sm font-medium text-gray-800`
              : `my-6 mr-2 flex h-[1.938rem] w-[1.938rem] 
          items-center justify-center rounded-full bg-gray-400
          text-sm font-medium text-gray-800`
          }
        >
          {number}
        </span>
        <span
          style={selected ? { fontWeight: "bold" } : {}}
          className="font-medium text-neutral-500 after:flex after:text-[0.8rem] after:content-[data-content] dark:text-neutral-300"
        >
          {title}
        </span>
      </div>
      <div className="absolute w-full p-4 transition-all duration-500 ease-in-out">
        {description}
      </div>
    </li>
  );
}
