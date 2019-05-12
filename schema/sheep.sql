DROP TABLE sheep;

CREATE TABLE sheep(
    sheep_id serial PRIMARY KEY,
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
    qty_bone NUMERIC(10,2),
    price_bone NUMERIC(10,2),
    total_bone NUMERIC(10,2),
    qty_other NUMERIC(10,2),
    price_other NUMERIC(10,2),
    desc_other VARCHAR(150),
    total_other NUMERIC(10,2),
    total NUMERIC(12,2),
    net_weight NUMERIC(10,2),
    message text
);