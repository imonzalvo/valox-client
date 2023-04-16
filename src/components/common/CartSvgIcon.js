export default function CartSvgIcon({ itemsCount }) {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute right-0 top-0 w-[16px] h-[16px] text-xs flex flex-row items-center justify-center font-bold text-white bg-secondary-700"
        style={{ borderRadius: 9 }}
      >
        {itemsCount}
      </div>
      <div className="w-full h-full flex flex-row justify-center items-center pt-1 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
          />
        </svg>
      </div>
    </div>
  );
}
