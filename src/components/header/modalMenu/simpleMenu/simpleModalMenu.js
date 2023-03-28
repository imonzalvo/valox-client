import ModalItem from "../modalItem";

export default function SimpleModalMenu({ options, setOpen, closeModal }) {
  return (
    <div className="z-50 absolute left-0 w-full md:max-w-screen-sm min-w-[280px] mt-2 origin-top-right">
      <div className="px-2 pt-2 pb-4 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {options.map((option) => {
            return (
              <ModalItem
                key={option.id}
                title={option.name}
                url={option.url}
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
