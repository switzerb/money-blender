export const getSavings = (savings) => {
    return savings && savings.length > 0 ? savings.reduce((a, n) => a + n.inflow - n.outflow, 0) : 0;
};

export const getSpending = (spending) => {
    return spending && spending.length > 0 ? spending.reduce((a, n) => a + n.inflow - n.outflow, 0) : 0;
};

export const getTotals = (savings, spending) => {
    return getSavings(savings) + getSpending(spending);
};

export const latestAllowanceRecord = (spending) => {
    if (!spending) return 0;
    const allowance = spending.filter((item) => item.description === 'Weekly Allowance');
    return allowance.length > 0
        ? Math.max.apply(
              Math,
              allowance.map((item) => item.timestamp.seconds * 1000),
          )
        : 0;
};

export const roundTo = (n, digits) => {
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
    n = (Math.round(n) / mult).toFixed(2);
    if (negative) {
        n = (n * -1).toFixed(2);
    }
    return parseFloat(n);
};
