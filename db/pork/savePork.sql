INSERT INTO pork (
    invoice_date,
    sold_by,
    customer,
    phone,
    cell_phone,
    email,
    baskets,
    row_num,
    qty_slaughter,
    price_slaughter,
    total_slaughter,
    qty_cut,
    price_cut,
    total_cut,
    qty_cure,
    price_cure,
    total_cure,
    qty_link,
    price_link,
    total_link,
    qty_bulk,
    qty_fat,
    price_fat,
    total_fat,
    qty_other,
    desc_other,
    price_other,
    total_other,
    total,
    lard,
    net_weight,
    message
)
VALUES (
    $(iDate),
    $(soldBy),
    $(customer),
    $(phone),
    $(cell_phone),
    $(email),
    $(baskets),
    $(row),
    $(slaughter),
    $(price_slaughter),
    $(total_slaughter),
    $(cutWrap),
    $(price_cut),
    $(total_cut),
    $(cure),
    $(price_cure),
    $(total_cure),
    $(links),
    $(price_links),
    $(total_links),
    $(bulk),
    $(fat),
    $(price_fat),
    $(total_fat),
    $(qty_other),
    $(desc_other),
    $(price_other),
    $(total_other),
    $(total),
    $(lard),
    $(net_weight),
    $(message)
)