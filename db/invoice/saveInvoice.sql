INSERT INTO invoice(
    invoice_date,
    sold_by,
    customer,
    memo,
    tax_exempt,
    tax_id_num,
    po_num,
    phone,
    cell_phone,
    email,
    location,
    qty_line1,
    desc_line1,
    price_line1,
    total_line1,
    qty_line2,
    desc_line2,
    price_line2,
    total_line2,
    qty_line3,
    desc_line3,
    price_line3,
    total_line3,
    qty_line4,
    desc_line4,
    price_line4,
    total_line4,
    qty_line5,
    desc_line5,
    price_line5,
    total_line5,
    qty_line6,
    desc_line6,
    price_line6,
    total_line6,
    qty_line7,
    desc_line7,
    price_line7,
    total_line7,
    qty_line8,
    desc_line8,
    price_line8,
    total_line8,
    qty_line9,
    desc_line9,
    price_line9,
    total_line9,
    qty_line10,
    desc_line10,
    price_line10,
    total_line10,
    sub_total,
    tax_amt,
    total
) VALUES (
    $(iDate),
    $(soldBy),
    $(customer),
    $(memo),
    $(taxExempt),
    $(taxIdNum),
    $(poNum),
    $(phone),
    $(cellPhone),
    $(email),
    $(location),
    $(qtyLine1),
    $(descLine1),
    $(priceLine1),
    $(totalLine1),
    $(qtyLine2),
    $(descLine2),
    $(priceLine2),
    $(totalLine2),
    $(qtyLine3),
    $(descLine3),
    $(priceLine3),
    $(totalLine3),
    $(qtyLine4),
    $(descLine4),
    $(priceLine4),
    $(totalLine4),
    $(qtyLine5),
    $(descLine5),
    $(priceLine5),
    $(totalLine5),
    $(qtyLine6),
    $(descLine6),
    $(priceLine6),
    $(totalLine6),
    $(qtyLine7),
    $(descLine7),
    $(priceLine7),
    $(totalLine7),
    $(qtyLine8),
    $(descLine8),
    $(priceLine8),
    $(totalLine8),
    $(qtyLine9),
    $(descLine9),
    $(priceLine9),
    $(totalLine9),
    $(qtyLine10),
    $(descLine10),
    $(priceLine10),
    $(totalLine10),
    $(subTotal),
    $(taxAmt),
    $(total)
);