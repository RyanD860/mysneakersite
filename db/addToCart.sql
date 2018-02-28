SELECT s.size, s.sku, p.name, p.price, p.productid, i.mainimage FROM stock AS s JOIN product AS p ON s.productid = p.productid JOIN images AS i ON p.productid = i.productid WHERE s.sku = $1;