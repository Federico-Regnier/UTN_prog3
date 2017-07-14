var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="Persona.ts" />
var Ciudadano = (function (_super) {
    __extends(Ciudadano, _super);
    function Ciudadano(nombre, apellido, edad, dni, pais, sexo) {
        var _this = _super.call(this, nombre, apellido, edad) || this;
        _this.dni = dni;
        _this.pais = pais;
        _this.sexo = sexo;
        return _this;
    }
    Ciudadano.prototype.CiudadanoToJSON = function () {
        return '{' + _super.prototype.PersonaToString.call(this) + ',"dni":' + this.dni + ',"pais":"' + this.pais + '","sexo":"' + this.sexo + '"}';
    };
    return Ciudadano;
}(Persona));
