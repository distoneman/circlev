SELECT circlev_id, invoice_date, sold_by, customer, phone, cell_phone, email,
    qty_line1 as qty_cut, total, net_weight
FROM circlev 
WHERE invoice_date = $(invoiceDate);