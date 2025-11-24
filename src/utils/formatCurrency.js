const formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const formatCurrency = (amount = 0) => formatter.format(Number(amount) || 0);

export default formatCurrency;
