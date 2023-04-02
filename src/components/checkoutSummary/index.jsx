import { useMemo } from "react";
import ProductItem from "./productItem";

const subPriceRow = (title, price) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-500">{title}</p>
      <p className="text-lg font-semibold text-gray-900">{`$ ${price}`}</p>
    </div>
  );
};
export default function CheckoutSummary({ products, details }) {
  const subtotal = useMemo(() => {
    return (
      details.totalAmount -
      details.shippingOption.cost -
      details.paymentMethod.cost
    );
  }, [details]);
  return (
    <div className="md:h-screen tablet:w-full small:w-full ">
      <div className="px-4 sm:px-6 lg:px-8 tablet:px-0 tablet:w-full tablet:flex tablet:justify-center">
        <div className="max-w-md rounded-3xl bg-white shadow-lg tablet:w-full">
          <div className="px-8 py-12 sm:px-8">
            <div>
              <ul className="-my-8">
                {products.map((product) => {
                  return (
                    <ProductItem
                      key={product.id}
                      quantity={1}
                      price={product.price}
                      imageUrl={product.image}
                      title={product.title}
                    />
                  );
                })}
              </ul>
            </div>
            <div className="mt-6 space-y-3 border-t border-b py-8">
              {subPriceRow("Subtotal", subtotal)}
              {subPriceRow("Envío", details.shippingOption.cost)}
              {subPriceRow(
                "Costo por metodo de pago",
                details.shippingOption.cost
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xl font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{`$ ${details.totalAmount}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
