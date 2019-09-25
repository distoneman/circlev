SELECT SUM(total) 
FROM sheep 
WHERE EXTRACT(quarter FROM invoice_date) = 2 AND 
    EXTRACT(year FROM invoice_date) = 2019;

