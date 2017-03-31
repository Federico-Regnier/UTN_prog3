<?php

require_once("persona.php");

class Empleado extends Persona
{
    protected $_legajo;
    protected $_sueldo;

    public function __construct($nombre, $apellido, $dni, $sexo, $legajo, $sueldo)
    {
        parent::__construct($nombre, $apellido, $dni, $sexo);
        $this->_legajo = $legajo;
        $this->_sueldo = $sueldo;
    }

    public function getLegajo()
    {
        return $this->_legajo;
    }

    public function getSueldo()
    {
        return $this->_sueldo;
    }

    public function Hablar($idioma)
    {
        return "El empleado habla ". $idioma;
    }

    public function ToString()
    {
        return parent::ToString() . "-" . $this->getLegajo() . "-" . $this->getSueldo();
    }
}

?>