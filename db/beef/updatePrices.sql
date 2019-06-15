UPDATE prices
SET slaughter = $(slaughter),
    cut_wrap = $(cutWrap),
    patties = $(patties),
    brand = $(brand)
WHERE price_id = 1;