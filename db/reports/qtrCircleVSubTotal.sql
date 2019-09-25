SELECT SUM(sub_total)
FROM circlev
WHERE EXTRACT(quarter from invoice_date) = 2 AND
    EXTRACT(year FROM invoice_date) = 2019;