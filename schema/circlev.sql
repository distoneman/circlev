CREATE TABLE circlev(
    circlev_id serial PRIMARY KEY,
    invoice_date DATE,
    sold_by VARCHAR(150),
    customer VARCHAR(150),
    phone VARCHAR(30),
    cell_phone BOOLEAN,
    email VARCHAR(200),
    baskets VARCHAR(10),
    row_num VARCHAR(25),
    qty_line1 NUMERIC(10,2),
    desc_line1 VARCHAR(150),
    price_line1 NUMERIC(10,2),
    total_line1 NUMERIC(10,2),
    qty_line2 NUMERIC(10,2),
    desc_line2 VARCHAR(150),
    price_line2 NUMERIC(10,2),
    total_line2 NUMERIC(10,2),
    sub_total NUMERIC(10,2),
    tax_amt NUMERIC(10,2),
    total NUMERIC(12,2),
    amt_paid NUMERIC(10,2),
    balance NUMERIC(10,2),
    net_weight NUMERIC(10,2),
    message text
);