DROP TABLE sheep_prices;

CREATE TABLE sheep_prices (
    price_id serial PRIMARY KEY,
    animal_type VARCHAR(25),
    slaughter NUMERIC(10,2),
    cut_wrap NUMERIC(10,2),
    bone_roll NUMERIC(10,2)
);

INSERT INTO sheep_prices (animal_type, slaughter, cut_wrap, bone_roll)
VALUES ('SHEEP', 45.00, .50, 2.0);