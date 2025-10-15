export function getDiscountPrice(price, discountPercentage) {
  if (!discountPercentage) return price.toFixed(2);
return (price * (1 - discountPercentage / 100)).toFixed(2);
}
