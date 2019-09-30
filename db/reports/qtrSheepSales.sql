SELECT SUM(total) 
FROM sheep 
WHERE EXTRACT(quarter FROM invoice_date) = $(taxQtr) AND 
    EXTRACT(year FROM invoice_date) = $(taxYear);

