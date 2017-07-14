/// <reference path="Persona.ts" />
class Ciudadano extends Persona{
    public dni:number;
    public pais:string;
    public sexo:string;

    public constructor(nombre:string, apellido:string, edad:number, dni:number, pais:string, sexo:string){
        super(nombre, apellido, edad);
        this.dni = dni;
        this.pais = pais;
        this.sexo = sexo;
    }

    public CiudadanoToJSON():String{
        return '{'+super.PersonaToString()+',"dni":'+this.dni+',"pais":"'+this.pais+'","sexo":"'+this.sexo+'"}';
    }
}
