UPDATE beef 
SET invoice_date = $(iDate),
    sold_by = $(soldBy),
    customer = $(customer),
    phone = $(phone),
    cell_phone = $(cell_phone),
    email = $(email),
    baskets = $(baskets),
    row_num = $(row),
    slaughter = $(slaughter),
    total_slaughter = $(total_slaughter),
    qty_cut = $(cutWrap),
    total_cut = $(total_cut),
    qty_patties = $(qty_patties),
    total_patties = $(total_patties),
    qty_brand = $(brand),
    total_brand = $(total_brand),
    qty_other = $(qty_other),
    desc_other = $(desc_other),
    price_other = $(price_other),
    total_other = $(total_other),
    total = $(total),
    net_weight = $(net_weight),
    message = $(message)
WHERE beef_id = $(beef_id)

returning *