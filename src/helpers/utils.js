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
      return Math.round(res)
    }
    default:
      return method.cost;
  }
};