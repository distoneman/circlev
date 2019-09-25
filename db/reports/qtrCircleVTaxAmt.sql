SELECT SUM(tax_amt)
FROM circlev
WHERE EXTRACT(quarter from invoice_date) = 2 AND
    EXTRACT(year FROM invoice_date) = 2019;