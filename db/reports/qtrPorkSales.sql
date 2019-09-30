SELECT SUM(total) 
FROM pork 
WHERE EXTRACT(quarter FROM invoice_date) = $(taxQtr) AND 
    EXTRACT(year FROM invoice_date) = $(taxYear);
