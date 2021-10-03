import { Transaction } from '../types/transactions';

export const getSavings = (savings: Transaction[]): number => {
    return savings && savings.length > 0 ? savings.reduce((a, n) => a + n.inflow - n.outflow, 0) : 0;
};

export const getSpending = (spending: Transaction[]): number => {
    return spending && spending.length > 0 ? spending.reduce((a, n) => a + n.inflow - n.outflow, 0) : 0;
};

export const getTotals = (savings: Transaction[], spending: Transaction[]): number => {
    return getSavings(savings) + getSpending(spending);
};

export const latestAllowanceRecord = (spending: Transaction[]): number => {
    if (!spending) return 0;
    const allowance = spending.filter((item) => item.description === 'Weekly Allowance');
    return allowance.length > 0
        ? // eslint-disable-next-line prefer-spread
          Math.max.apply(
              Math,
              allowance.map((item) => {
                  const date = new Date(item.timestamp);
                  return date.getSeconds() * 1000;
              }),
          )
        : 0;
};

export const roundTo = (n: number, digits: number): number => {
    let negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    const mult = Math.pow(10, digits);
    n = parseFloat((n * mult).toFixed(11));
    let s = (Math.round(n) / mult).toFixed(2);
    if (negative) {
        s = (n * -1).toFixed(2);
    }
    return parseFloat(s);
};
