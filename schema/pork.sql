DROP TABLE pork;

CREATE TABLE pork(
    pork_id serial PRIMARY KEY,
    invoice_date DATE,
    sold_by VARCHAR(150),
    customer VARCHAR(150),
    phone VARCHAR(30),
    cell_phone BOOLEAN,
    email VARCHAR(200),
    baskets VARCHAR(10),
    row_num VARCHAR(25),
    qty_slaughter NUMERIC(10,2),
    price_slaughter NUMERIC(10,2),
    total_slaughter NUMERIC(10,2),
    qty_cut NUMERIC(10,2),
    price_cut NUMERIC(10,2),
    total_cut NUMERIC(10,2),
    qty_cure NUMERIC(10,2),
    price_cure NUMERIC(10,2),
    total_cure NUMERIC(10,2),
    qty_link NUMERIC(10,2),
    price_link NUMERIC(10,2),
    total_link NUMERIC(10,2),
    qty_bulk NUMERIC(10,2),
    qty_fat NUMERIC(10,2),
    price_fat NUMERIC(10,2),
    total_fat NUMERIC(10,2),
    qty_other NUMERIC(10,2),
    price_other NUMERIC(10,2),
    desc_other VARCHAR(150),
    total_other NUMERIC(10,2),
    total NUMERIC(12,2),
    lard NUMERIC(10,2),
    net_weight NUMERIC(10,2),
    message text
);