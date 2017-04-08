<?php
require_once("empleado.php");
require_once("persona.php");


if($_SERVER["REQUEST_METHOD"] == "POST")
{
    $nombre = $_POST["txtNombre"];
    $apellido = $_POST["txtApellido"];
    $dni = $_POST["txtDni"];
    $sexo = $_POST["txtSexo"];
    $legajo = $_POST["txtLegajo"];
    $sueldo = $_POST["txtSueldo"];

    $empleado = new Empleado($nombre , $apellido, $dni, $sexo, 
                             $legajo, $sueldo);

    $ar = fopen("empleados.txt", "a");
    $cant = fwrite($ar, $empleado->ToString()."\r\n");
    fclose($ar);
    if($cant > 0)
    {
        echo "Empleado agregado exitosamente<br>";
        echo '<a href="./mostrar.php">Ver Empleados</a>';
    }
    else
    {
        echo "No se pudo agregar el empleado<br>";
        echo '<a href="./index.html">Volver</a>';
    }

}
else
{
    echo "Formulario vacio<br>";
    echo '<a href = "./index.html">Volver</a>';
}
?>