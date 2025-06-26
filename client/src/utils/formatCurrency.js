// utils/formatCurrency.js

const formatCurrency = (amount, currency) => {
  let formattedAmount = amount;
  const options = { style: 'currency', currency };

  try {
    formattedAmount = new Intl.NumberFormat('en-US', options).format(amount);
  } catch (err) {
    console.error('Error formatting currency:', err);
    formattedAmount = amount; // Fallback to just the amount
  }

  return formattedAmount;
};

export default formatCurrency;