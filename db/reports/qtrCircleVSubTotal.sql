SELECT SUM(sub_total)
FROM circlev
WHERE EXTRACT(quarter from invoice_date) = $(taxQtr) AND
    EXTRACT(year FROM invoice_date) = $(taxYear);