SELECT SUM(tax_amt)
FROM circlev
WHERE EXTRACT(quarter from invoice_date) = $(taxQtr) AND
    EXTRACT(year FROM invoice_date) = $(taxYear);