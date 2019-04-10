create table beef (
    beef_id serial primary key,
    invoice_date date,
    customer varchar(150),
    phone varchar(12),
    cell_phone boolean,
    email varchar(200),
    baskets varchar(10),
    row_num varchar(10),
    slaughter numeric(10,2),
    price_slaughter numeric(10,2),
    total_slaughter numeric(10,2),
    qty_cut numeric(10,2),
    price_cut numeric(10,2),
    total_cut numeric(10,2),
    qty_patties numeric(10,2),
    price_patties numeric(10,2),
    total_patties numeric(10,2),
    qty_brand numeric(10,2),
    price_brand numeric(10,2),
    total_brand numeric(10,2),
    qty_other numeric(10,2),
    desc_other varchar(150),
    price_other numeric(10,2),
    total_other numeric(10,2),
    total numeric(12,2),
    message text,
    address text
)