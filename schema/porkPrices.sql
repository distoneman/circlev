DROP TABLE pork_prices;

CREATE TABLE pork_prices (
    price_id serial PRIMARY KEY,
    animal_type VARCHAR(25),
    slaughter NUMERIC(10,2),
    cut_wrap NUMERIC(10,2),
    cure NUMERIC(10,2),
    link NUMERIC(10,2),
    fat NUMERIC(12,2)
);

INSERT INTO pork_prices (animal_type, slaughter, cut_wrap, cure, link, fat)
VALUES ('PORK', 40.00, .50, .55, .35, .80);