UPDATE pork_prices
SET slaughter = $(slaughter),
    cut_wrap = $(cutWrap),
    cure = $(cure),
    links = $(links),
    fat = $(fat)
WHERE price_id = 1;