SELECT circlev_id, invoice_date, sold_by, customer, phone, cell_phone, email, qty_line1 as qty_cut, total, net_weight 
FROM circlev 
WHERE sold_by LIKE $(soldBy) OR UPPER(sold_by) LIKE UPPER($(soldBy)) 
ORDER BY invoice_date DESC;