// Currency & Number Formatting Helpers for Indian Context
export const formatINR = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

export const formatNumberIndian = (num) => {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-IN');
};
