drop table prices;

create table prices (
    price_id serial primary key,
    animal_type varchar(25),
    slaughter numeric(12,2),
    cut_wrap numeric(12,2),
    patties numeric(12,2),
    brand numeric(12,2)
);

INSERT INTO prices (animal_type, slaughter, cut_wrap, patties, brand)
VALUES ('BEEF', 45.00, .50, .35, 5.00);