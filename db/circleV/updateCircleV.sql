UPDATE circlev
SET invoice_date = $(iDate),
    sold_by = $(soldBy),
    customer = $(customer),
    phone = $(phone),
    cell_phone = $(cellPhone),
    email = $(email),
    baskets = $(baskets),
    row_num = $(row),
    qty_line1 = $(qtyLine1),
    desc_line1 = $(descLine1),
    price_line1 = $(priceLine1),
    total_line1 = $(totalLine1),
    qty_line2 = $(qtyLine2),
    desc_line2 = $(descLine2),
    price_line2 = $(priceLine2),
    total_line2 = $(totalLine2),
    sub_total = $(subTotal),
    tax_amt = $(taxAmt),
    total = $(total),
    amt_paid = $(amtPaid),
    balance = $(balance),
    net_weight = $(netWeight),
    message = $(message)
WHERE circlev_id = $(circleVId)