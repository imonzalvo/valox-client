import ProductCard from "../productCard";

export default function ProductList({ products }) {
  return (
    <div className="lg:col-span-3">
      {
        <div className="bg-white">
          <div className="mx-auto px-4  px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="flex flex-1 flex-wrap flex-row justify-around">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imageUrl={product.images[0].image.url}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
