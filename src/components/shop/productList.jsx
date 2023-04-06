import ProductCard from "../productCard";

export default function ProductList({ products }) {
  return (
    <div className="lg:col-span-3">
      {
        <div className="bg-white">
          <div className="mx-auto px-4 px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="flex flex-1 flex-wrap flex-row start items-start">
              {products.map((product) => (
                <div
                key={product.id}
                className="mr-6 mb-6"
                >
                  <ProductCard
                    id={product.id}
                    product={product}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
