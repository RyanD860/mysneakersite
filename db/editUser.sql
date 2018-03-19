UPDATE users SET firstname = $2, lastname = $3, address = $4, city = $5, state = $6, zipcode = $7, email = $8, phone = $9 WHERE authid = $1;
SELECT * from users WHERE authid = $1;