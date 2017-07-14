<?php
require_once("persona.php");
require_once("empleado.php");

$empleados = array();
$ar = FALSE;
if(file_exists("empleados.txt"))
{
    $ar = fopen("empleados.txt", "r");
}
if($ar)
{
    while(!feof($ar))
    {
        $aux = fgets($ar);
        $empleado = explode(" - " , $aux);
        $empleado[0] = trim($empleado[0]);
        if($empleado[0] != "")
        {
            $empleados[] = new Empleado($empleado[0], $empleado[1],$empleado[2],
                                        $empleado[3], $empleado[4], $empleado[5]);
            end($empleados)->setPathFoto($empleado[6]);

        }
    }

    fclose($ar);

    foreach($empleados as $value)
    {
        echo $value->ToString()."<br>";
    }
}
else{
    echo "No hay ningun empleado cargado<br>";
}
echo '<a href="./index.html">Volver</a>';

?>