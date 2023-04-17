import { calculateMethodPrice } from "@/helpers/utils";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function ProductInfo({
  product,
  availableShippingOptions,
  availablePaymentMethods,
}) {
  return (
    <div className="max-w-md mb-6">
      <h2 className="mb-4 text-5xl md:text-7xl lg:text-8xl font-heading font-medium">
        {product.title}
      </h2>
      <p className="flex items-center mb-6">
        <span className="mr-2 text-base text-gray-800 font-medium">$</span>
        <span className="text-3xl text-gray-800 font-medium">
          {product.price}
        </span>
      </p>
      <p className="text-lg text-gray-400">{product.description}</p>

      <div className="mt-8">
        <h4 className="font-heading font-normal">Mas Información</h4>
        <hr className="my-2 h-0.5 border-t-1 bg-neutral-100 opacity-100" />
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-gray-900">
                <span className="font-bold">Metodos y costos de Envío</span>
                {open ? (
                  <MinusIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                ) : (
                  <PlusIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                <div className="flex flex-col">
                  {availableShippingOptions.map((availableShipingOption) => {
                    const {
                      shippingOption: { name, description },
                    } = availableShipingOption;
                    const realCost = calculateMethodPrice(
                      availableShipingOption,
                      product.price
                    );
                    return (
                      <div
                        key={availableShipingOption.id}
                        className="flex flex-col mb-4"
                      >
                        <span className="text-gray-800 font-semibold">
                          {`${name}: `}
                          <span className="font-normal">{` $ ${realCost}`}</span>
                        </span>
                        <span>{description}</span>
                      </div>
                    );
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <hr className="my-2 h-0.5 border-t-1 bg-neutral-100 opacity-100" />

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-gray-900">
                <span className="font-bold">Metodos de Pago</span>
                {open ? (
                  <MinusIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                ) : (
                  <PlusIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-500`}
                  />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                <div className="flex flex-col">
                  {availablePaymentMethods.map((availablePaymentMethod) => {
                    const {
                      paymentMethod: { name, description },
                    } = availablePaymentMethod;
                    const realCost = calculateMethodPrice(
                      availablePaymentMethod,
                      product.price
                    );
                    return (
                      <div
                        key={availablePaymentMethod.id}
                        className="flex flex-col mb-4"
                      >
                        <span className="text-gray-800 font-semibold">
                          {`${name}: `}
                          <span className="font-normal">{` $ ${realCost}`}</span>
                        </span>
                        <span>{description}</span>
                      </div>
                    );
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
