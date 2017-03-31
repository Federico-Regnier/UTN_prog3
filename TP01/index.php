<?php

include_once("persona.php");
require_once("empleado.php");
require_once("fabrica.php");

$empleado = new Empleado("Juan", "Perez", 36666555,"M",15698, 20569.56);
$fabrica = new Fabrica("La Fabrica");

echo "<h1> Prueba Empleado </h1>";
echo $empleado->ToString();
echo "<br>";
echo $empleado->Hablar("Ingles");
echo "<hr>";

//Agrego 2 empleados a la fabrica
if($fabrica->AgregarEmpleado($empleado))
    echo "Empleado agregado<br>";
if($fabrica->AgregarEmpleado(new Empleado("Jorge", "Lopez", 13555666, "M", 4, 5000)))
    echo "Empleado agregado<br>";

//Agrego un empleado Repetido
if(!$fabrica->AgregarEmpleado($empleado))
    echo "Empleado no agregado<br>";

//Muestro los datos de la fabrica y los sueldos
echo "<hr>";
echo $fabrica->ToString();
echo "<br>";
echo "Sueldos: ". $fabrica->CalcularSueldos();

//Borro empleados
echo "<hr> Borrando un empleado... <br>";
if($fabrica->EliminarEmpleado($empleado))
    echo "Empleado borrado<br>";

echo "Borro un empleado que no existe...";
if($fabrica->EliminarEmpleado(new Empleado("Maria", "Gonzalez", 24666999, "F", 9, 10000)))
    echo "Empleado borrado";
else
    echo "Empleado no borrado<br>";
echo"<hr>";
echo $fabrica->ToString();

?>