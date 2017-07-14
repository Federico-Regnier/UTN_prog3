var Persona = (function () {
    function Persona(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    Persona.prototype.PersonaToString = function () {
        return '"nombre":"' + this.nombre + '","apellido":"' + this.apellido + '","edad":' + this.edad;
    };
    return Persona;
}());
