export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatdDate = (zone: string, createdAt: Date) => {
  return new Date(createdAt).toLocaleDateString(zone, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
