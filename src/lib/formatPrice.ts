export const formatPrice = (value: number) =>
  new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" }).format(
    value,
  );
