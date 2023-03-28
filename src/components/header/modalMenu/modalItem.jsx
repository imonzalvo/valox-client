import Link from "next/link";

export default function ModalItem({
  title,
  description,
  url,
  setOpen,
  closeModal,
}) {
  return (
    <Link
      onClick={() => {
        setOpen(false);
        closeModal();
      }}
      href={url}
      className="flex flex row items-center rounded-lg bg-white p-2 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
    >
      <div className="bg-primary-300 text-white rounded-lg p-3">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="md:h-6 md:w-6 h-4 w-4"
        >
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
      </div>
      <div className="ml-3">
        <p className="font-semibold">{title}</p>
        {/* <p className="text-sm">Easy customization</p> */}
      </div>
    </Link>
  );
}
