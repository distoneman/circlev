SELECT pork_id, invoice_date, sold_by, customer, phone, cell_phone, email, qty_cut, total, net_weight 
FROM pork 
WHERE customer LIKE $(customer) OR UPPER(customer) LIKE UPPER($(customer)) 
ORDER BY invoice_date DESC;