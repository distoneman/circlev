SELECT pork_id, invoice_date, sold_by, customer, phone, cell_phone, email, total, net_weight 
FROM pork 
WHERE sold_by LIKE $(soldBy) OR UPPER(sold_by) LIKE UPPER($(soldBy)) 
ORDER BY invoice_date DESC;