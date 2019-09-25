SELECT SUM(tax_amt)
FROM invoice
WHERE EXTRACT(quarter from invoice_date) = 2 AND
    EXTRACT(year FROM invoice_date) = 2019 AND
    tax_exempt = 't';