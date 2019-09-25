SELECT SUM(total) 
FROM pork 
WHERE EXTRACT(quarter FROM invoice_date) = 1 AND 
    EXTRACT(year FROM invoice_date) = 2019;
