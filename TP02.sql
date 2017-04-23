-- Ejercicio 1
SELECT * FROM Productos ORDER BY pNombre ASC;

-- Ejercicio 2
SELECT * FROM Proveedores WHERE Localidad = 'Quilmes';

-- Ejercicio 3
SELECT * FROM Envios WHERE cantidad >= 200 AND cantidad <= 300;

-- Ejercicio 4
SELECT SUM(cantidad) FROM Envios;

-- Ejercicio 5
SELECT pNumero FROM Productos LIMIT 3;

-- Ejercicio 6
SELECT  Proveedores.Nombre, 
        Productos.pNombre, 
        Envios.Cantidad
FROM    Envios
INNER JOIN Proveedores ON Envios.Numero = Proveedores.Numero
INNER JOIN Productos ON Envios.pNumero = Productos.pNumero
ORDER BY Envios.Numero ASC;

-- Ejercicio 7
SELECT  Numero, 
        Envios.pNumero, 
        Cantidad , 
        CAST((Cantidad * Productos.Precio) AS Decimal(7,2)) as Monto
FROM Envios
INNER JOIN Productos ON Envios.pNumero = Productos.pNumero;

-- Ejercicio 8
SELECT  SUM(cantidad)
FROM    Envios 
WHERE   Numero = 102 AND pNumero = 1;

-- Ejercicio 9
SELECT  pNumero 
FROM    Envios e, Proveedores p
WHERE   e.Numero = p.Numero AND
        p.Localidad = 'Avellaneda';


-- Ejercicio 10
SELECT Domicilio, Localidad 
FROM Proveedores
WHERE Nombre LIKE '%I%';

-- Ejercicio 11
INSERT INTO Productos(pNumero, pNombre, Precio, Tamaño)
VALUES (4, 'Chocolate', 25.35, 'Chico');

-- Ejercicio 12
INSERT INTO Proveedores(Numero)
VALUES (103);

-- Ejercicio 13
INSERT INTO Proveedores(Numero, Nombre, Localidad)
VALUES (107, 'Rosales', 'La Plata');

-- Ejercicio 14
UPDATE  Productos
SET     Precio = 97.50
WHERE Tamaño = 'grande';

-- Ejercicio 15


-- Ejercicio 16
DELETE FROM Productos
LIMIT 1;

-- Ejercicio 17
DELETE FROM Proveedores
WHERE Numero NOT IN (SELECT Numero FROM Envios);