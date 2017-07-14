<?php
require_once("empleado.php");
require_once("persona.php");



if(isset($_POST["guardar"]))
{
    $nombre = $_POST["txtNombre"];
    $apellido = $_POST["txtApellido"];
    $dni = $_POST["txtDni"];
    $sexo = $_POST["txtSexo"];
    $legajo = $_POST["txtLegajo"];
    $sueldo = $_POST["txtSueldo"];
    
    $tipoArchivo = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    $destino = "./fotos/". $dni. "-". $apellido. ".". $tipoArchivo ;
    $uploadFoto = TRUE;

    if($_FILES["foto"]["size"] > 100000)
    {
        echo "El archivo es demasiado pesado(max 1mb).";
        $uploadFoto = FALSE;
    }

    $esImagen = getimagesize($_FILES["foto"]["tmp_name"]);
    if($esImagen === FALSE)
    {
        echo "El archivo debe ser una imagen";
        $uploadFoto = FALSE;
    }
    else{
        if($tipoArchivo != "jpg" && $tipoArchivo != "bmp" 
           && $tipoArchivo != "gif" && $tipoArchivo != "png" && $tipoArchivo != "jpeg")
           {
               echo "Solo son permitidas imagenes JPG, BMP, GIF, PNG o JPEG";
               $uploadFoto = FALSE;
           }
    }

    if(file_exists("./fotos/".$dni."-".$apellido.".".$tipoArchivo ))
    {
        echo "Ya existe una imagen para el empleado";
        $uploadFoto = FALSE;
    }
    
    if($uploadFoto)
    {
        if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
        {
            
            $empleado = new Empleado($nombre , $apellido, $dni, $sexo, 
                                    $legajo, $sueldo);
            $empleado->setPathFoto(basename($destino));
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
    }
    else{
        echo "<br>No se pudo agregar el empleado";
    }
}

?>