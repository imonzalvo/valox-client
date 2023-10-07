export const isOrderStatusError = (status) => {
  return status == "payment_error";
};

export const calculateMethodPrice = (method, productsAmount) => {
  switch (method.costType) {
    case "FIXED": {
      return method.cost;
    }
    case "PERCENTAGE": {
      const res = (method.cost / 100) * productsAmount;
      return Math.round(res);
    }
    default:
      return method.cost;
  }
};

export const getProductDefaultImages = () => {
  const thumbnail = "/media/wh7ww-default-product-image-400x300.webp";
  const card = "/media/szm54-default-product-image-768x1024.webp";
  const tablet = "/media/fhkdb-default-product-image-1024x1024.webp";
  const original = "/media/frbf4-default-product-image.webp";

  const image = {
    url: original,
    sizes: {
      thumbnail: {
        url: thumbnail,
      },
      card: {
        url: card,
      },
      tablet: {
        url: tablet,
      },
      original: {
        url: original,
      },
    },
  };

  return [{ image }];
};
