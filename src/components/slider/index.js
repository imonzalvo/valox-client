export default function Slider({ products }) {
  return (
    <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
      {products.map((card, index) => {
        const isLocal =
          card.images[0].image.sizes["thumbnail"].url.includes("localhost");

        const cardImage = `${isLocal ? "" : process.env.NEXT_PUBLIC_API_URL}${
          card.images[0].image.url
        }`;
        return (
          <div key={cardImage} className="carousel-item">
            <img src={cardImage} className="rounded-box" />
          </div>
        );
      })}
    </div>
  );
}
