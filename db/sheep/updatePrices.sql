UPDATE sheep_prices
SET slaughter = $(slaughter),
    cut_wrap = $(cutWrap),
    bone_roll = $(boneRoll)
WHERE price_id = 1;