function mortgageCalc(totalLoan, APR, durationMonths) {
  /*
    Calculates the monthly payment on a given fixed rate mortgage.
    @param {number} TotalLoan - the total loan principle.
    @param {number} APR - the annual percentage rate of the loan,
    in decimal form. ie 17% would be given as .17
    @param {number} durationMonths - the duration of the loan, in months
    @returns {string} A string telling you the monthly payment.
  */

  //Guard Cases
  if (!Number.isInteger(durationMonths)) {
    return 'The duration in months must be an integer';

  }
  if (!Number.isFinite(totalLoan)) {
    return 'The total loan amount must be a number';
  }
  if (!Number.isFinite(APR)) {
    return 'The APR must be a finite number in decimal form';
  }

  const MONTHLY_RATE = APR / 12;

  let monthlyPayment = totalLoan * (MONTHLY_RATE / (1 - Math.pow((1 + MONTHLY_RATE), (-durationMonths))));
  monthlyPayment = monthlyPayment.toFixed(2);
  return `The monthly payment will be $${monthlyPayment}.`;
}

console.log(mortgageCalc(1000, .1, 48));