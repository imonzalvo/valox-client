export const getShopUrlForCategoryId = (business, id) => {
  return `/${business}/shop?categoryId=${id}`;
};

export const getProductUrl = (business, id) => `/${business}/products/${id}`;

export const getCheckoutOrderInfo = (business) =>
  `/${business}/checkout/orderInfo`;

export const getPaymentsUrl = (business, orderId) =>
  `/${business}/checkout/payment?orderId=${orderId}`;

export const getCongratsUrl = (business, orderId) =>
  `/${business}/checkout/congrats?orderId=${orderId}`;

export const getBusinessHome = (business) => {
  return `/${business}`;
};
