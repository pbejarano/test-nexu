--Insert BRANDS from json models
INSERT INTO brands (nombre)
SELECT brand_name from models_json GROUP BY brand_name

--Insert MODELS from json models
INSERT INTO models(name, average_price, id_brand)
SELECT j.name, j.average_price, b.id from models_json j INNER JOIN brands b ON b.nombre = j.brand_name


-- TO CHECK DATA

SELECT count(id) from models WHERE id_brand = 2;

SELECT id_brand, AVG(average_price) from models where id_brand = 1;

SELECT id_brand, AVG(average_price) from models GROUP BY id_brand;

SELECT id_brand, AVG(average_price) from models INNER JOIN  GROUP BY id_brand

SELECT b.id, b.nombre, AVG(j.average_price) as average_price from models_json j INNER JOIN brands b ON b.nombre = j.brand_name GROUP BY b.id