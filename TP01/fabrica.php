<?php

class Fabrica
{
    private $_empleados;
    private $_razonSocial;    

    public function __construct($razonSocial)
    {
        $this->_empleados = array();
        $this->_razonSocial = $razonSocial;
    }

    private function EliminarEmpleadosRepetidos()
    {
        $this->_empleados = array_unique($this->_empleados, SORT_REGULAR);
    }

    public function AgregarEmpleado($persona)
    {
        $cantEmpleados = count($this->_empleados);
        array_push($this->_empleados, $persona);
        $this->EliminarEmpleadosRepetidos();
        if($cantEmpleados == count($this->_empleados))
            return false;
        return true;
    }

    public function EliminarEmpleado($persona)
    {
        $clave;
        $clave = array_search($persona, $this->_empleados);
        if($clave !== false)
            {
                unset($this->_empleados[$clave]);
                return true;
            }
        return false;
    }

    public function CalcularSueldos()
    {
        $sueldosAPagar = 0;

        foreach ($this->_empleados as $value) 
        {       
            $sueldosAPagar += $value->getSueldo();
        }

        return $sueldosAPagar;

    }

    public function ToString()
    {
        $string;

        $string = $this->_razonSocial;
        foreach($this->_empleados as $value)
        {
            $string = $string . "<br>" . $value->ToString();
        }

        return $string;
    }
}

?>