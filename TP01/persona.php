<?php

abstract class Persona
{
    public $_nombre;
    public $_apellido;
    public $_dni;
    public $_sexo;

    public function __construct($nombre, $apellido, $dni, $sexo)
    {
        $this->_nombre = $nombre;
        $this->_apellido = $apellido;
        $this->_dni = $dni;
        $this->_sexo = $sexo;
    }

    public abstract function Hablar($idioma);

    public function getNombre()
    {
        return $this->_nombre;
    }

    public function getApellido()
    {
        return $this->_apellido;
    }

    public function getDni()
    {
        return $this->_dni;
    }

    public function getSexo()
    {
        return $this->_sexo;
    }

    public function ToString()
    {
        return $this->getNombre() . "-" . $this->getApellido() . "-" . $this->getDni() . "-" . $this->getSexo();
    }
}

?>