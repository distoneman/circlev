SELECT to_char(invoice_date, 'MM/DD/YYYY') as date_fmt, customer, qty_patties, net_weight, (net_weight * .45) AS gr_beef FROM beef 
    WHERE invoice_date >= $(startDate) AND invoice_date <= $(endDate)
    ORDER BY invoice_date;