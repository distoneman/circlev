SELECT beef_id, invoice_date, sold_by, customer, phone, cell_phone, email, total, net_weight 
FROM beef 
WHERE customer LIKE $(customer) OR customer LIKE UPPER($(customer))
ORDER BY invoice_date DESC;