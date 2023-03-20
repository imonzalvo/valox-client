import { useMemo } from "react";
import ProductItem from "./productItem";

const subPriceRow = (title, price) => {
  return (
    <div class="flex items-center justify-between">
      <p class="text-gray-400">{title}</p>
      <p class="text-lg font-semibold text-gray-900">{`$ ${price}`}</p>
    </div>
  );
};
export default function CheckoutSummary({ products, details }) {
  console.log("products", products);
  console.log("shippingOption", details.shippingOption);
  console.log("paymentMethod", details.paymentMethod);
  const subtotal = useMemo(() => {
    return details.totalAmount -
      details.shippingOption.cost -
      details.paymentMethod.cost;
  }, [details]);
  return (
    <div class="md:h-screen tablet:w-full small:w-full ">
      <div class="px-4 sm:px-6 lg:px-8 tablet:px-0 tablet:w-full tablet:flex tablet:justify-center">
        <div class="max-w-md rounded-3xl bg-white shadow-lg tablet:w-full">
          <div class="px-8 py-12 sm:px-8">
            <div>
              <ul class="-my-8">
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
            <div class="mt-6 space-y-3 border-t border-b py-8">
              {subPriceRow("Subtotal", subtotal)}
              {subPriceRow("Envío", details.shippingOption.cost)}
              {subPriceRow("Costo por metodo de pago", details.shippingOption.cost)}
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-base font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">{`$ ${details.totalAmount}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
