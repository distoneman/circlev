SELECT SUM(sub_total)
FROM invoice
WHERE EXTRACT(quarter from invoice_date) = $(taxQtr) AND
    EXTRACT(year FROM invoice_date) = $(taxYear) AND
    tax_exempt = $(taxExempt);