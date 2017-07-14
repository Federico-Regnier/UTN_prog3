/// <reference path="Persona.ts" />
/// <reference path="Ciudadano.ts" />
class Manejadora{
    public static AgregarCiudadano():void{
        let nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        let apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
        let dni:number = (Number)((<HTMLInputElement>document.getElementById("txtDni")).value);
        let edad:number = (Number)((<HTMLInputElement>document.getElementById("txtEdad")).value);
        let pais:string = (<HTMLInputElement>document.getElementById("txtPais")).value;
        let sexo:string = (<HTMLInputElement>document.querySelector('input[name = "sexo"]:checked')).value;
        let index:string = (<HTMLInputElement>document.getElementById("indexCiudadano")).value;
        let c:Ciudadano = new Ciudadano(nombre, apellido, edad, dni, pais,sexo);
        
        /*
        // Personas guardadas con JSON stringify
        let personasLS = localStorage.getItem("personas");
        let ciudadanos:Array<Ciudadano> = personasLS !== null? JSON.parse(personasLS) : [];
        // Para el modificar en el mismo form
        if(index === ""){
            ciudadanos.push(c);
        } else{
            ciudadanos[parseInt(index)] = c;
            (<HTMLInputElement>document.getElementById("indexCiudadano")).value = "";
            (<HTMLInputElement>document.getElementById("btnsNormales")).style.display = 'block';
            (<HTMLInputElement>document.getElementById("btnsModificar")).style.display = 'none';
        }

        localStorage.setItem("personas", JSON.stringify(ciudadanos));
        Manejadora.MostrarCiudadanos();*/
        
        
        let personasLS = localStorage.getItem("personas");
        let personasJSON:string = personasLS !== null? personasLS : "[]";
        let ciudadanos:string;
        if(index === ""){
            ciudadanos = personasJSON.slice(0, -1);
            ciudadanos += "," +c.CiudadanoToJSON()+"]";
        } else{
            let personas:Array<Ciudadano> = JSON.parse(personasJSON);
            personas[parseInt(index)] = c;
            ciudadanos = JSON.stringify(personas);
            (<HTMLInputElement>document.getElementById("indexCiudadano")).value = "";
            (<HTMLInputElement>document.getElementById("btnsNormales")).style.display = 'block';
            (<HTMLInputElement>document.getElementById("btnsModificar")).style.display = 'none';
            Manejadora.Cancelar();
        }

        localStorage.setItem("personas", ciudadanos);
        Manejadora.MostrarCiudadanos();
        
    }

    public static MostrarCiudadanos():void{
        let personas = localStorage.getItem("personas");
        let personasJSON = personas !== null? JSON.parse(personas) : [];
        
        if(personasJSON !== [])
        {   
            let tabla:string = "";
            tabla += '<div class="table-responsive">';
            tabla +='<table class="table table-bordered">'+
                "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th><th>Pais</th><th>Dni</th><th>Acciones</th></tr>";

            for (let i = 0; i < personasJSON.length; i++) {
                tabla+= "<tr>"+
                        "<td>"+personasJSON[i].nombre+"</td>"+
                        "<td>"+personasJSON[i].apellido+"</td>"+
                        "<td>"+personasJSON[i].edad+"</td>"+
                        "<td>"+personasJSON[i].sexo+"</td>"+
                        "<td>"+personasJSON[i].pais+"</td>"+
                        "<td>"+personasJSON[i].dni+"</td>"+
                        "<td>"+
                        '<a class="btn btn-danger" onclick="Manejadora.EliminarCiudadano('+ i + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
                        '<a class="btn btn-success" onclick="Manejadora.ModificarCiudadano('+ i + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>'+
                        "</td>"+
                        "</tr>";              
            }
            tabla+="</table></div>";
            (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
        }
    }

    public static EliminarCiudadano(index:number):void{
        let personas = localStorage.getItem("personas");
        if(personas !== null){
            let ciudadanos:Array<Ciudadano> = JSON.parse(personas);
            ciudadanos.splice(index, 1);
            localStorage.setItem("personas", JSON.stringify(ciudadanos));
            Manejadora.MostrarCiudadanos();
        }

    }

    public static ModificarCiudadano(index:number){
        let personas = localStorage.getItem("personas");
        if(personas !== null){
            let arrayPersonas = JSON.parse(personas);
            let persona:Ciudadano = arrayPersonas[index];

            (<HTMLInputElement>document.getElementById("txtNombre")).value = persona.nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value = persona.apellido;
            (<HTMLInputElement>document.getElementById("txtDni")).value = String(persona.dni);
            (<HTMLInputElement>document.getElementById("txtEdad")).value = String(persona.edad);
            (<HTMLInputElement>document.getElementById("txtPais")).value = persona.pais;
            if(persona.sexo == "Masculino"){
                (<HTMLInputElement>document.getElementById("rdMasc")).checked = true;
            } else {
                (<HTMLInputElement>document.getElementById("rdFem")).checked = true;
            }
            console.log((Number)((<HTMLInputElement>document.getElementById("indexCiudadano")).value));
            (<HTMLInputElement>document.getElementById("indexCiudadano")).value = String(index);
            (<HTMLInputElement>document.getElementById("btnsNormales")).style.display = 'none';
            (<HTMLInputElement>document.getElementById("btnsModificar")).style.display = 'block';
        }
    }

    public static FiltrarCiudadanoPorPais(){
        let personasJSON = localStorage.getItem("personas");
        let pais:string = (<HTMLInputElement>document.getElementById("txtPais")).value;
        let ciudadanos:Array<Ciudadano> = personasJSON !== null? JSON.parse(personasJSON) : [];
        
        let ciudadanosPorPais = ciudadanos.filter(persona => persona.pais == pais);

        let tabla:string = "";
        tabla += '<div class="table-responsive">';
        tabla +='<table class="table table-bordered">'+
            "<thead>"+
            "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th><th>Pais</th><th>Dni</th><th>Acciones</th></tr></thead><tbody>";
        for (let i = 0; i < ciudadanosPorPais.length; i++) {
            tabla+= "<tr>"+
                        "<td>"+ciudadanosPorPais[i].nombre+"</td>"+
                        "<td>"+ciudadanosPorPais[i].apellido+"</td>"+
                        "<td>"+ciudadanosPorPais[i].edad+"</td>"+
                        "<td>"+ciudadanosPorPais[i].sexo+"</td>"+
                        "<td>"+ciudadanosPorPais[i].pais+"</td>"+
                        "<td>"+ciudadanosPorPais[i].dni+"</td>"+
                        "<td>"+
                        '<a class="btn btn-danger" onclick="Manejadora.EliminarCiudadano('+ i + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
                        '<a class="btn btn-success" onclick="Manejadora.ModificarCiudadano('+ i + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>'+
                        "</td>"+
                    "</tr>";              
            }
            tabla+="</tbody></table></div>";
            (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
    }

    public static PromedioEdadPorSexo(){
        let personasJSON = localStorage.getItem("personas");
        let sexo:string = (<HTMLInputElement>document.querySelector('input[name = "sexo"]:checked')).value;
        let ciudadanos:Array<Ciudadano> = [];

        ciudadanos = personasJSON !== null? JSON.parse(personasJSON) : [];

        if(ciudadanos !== []){
            let ciudadanosPorSexo = ciudadanos.filter(persona => persona.sexo == sexo)
            let promedioEdad = ciudadanosPorSexo.reduce((anterior, actual) => anterior + actual.edad, 0) / ciudadanosPorSexo.length;
            let tabla:string = "";
            tabla += '<div class="table-responsive">';
            tabla +='<table class="table table-bordered"><thead>'+
                "<tr><th>Sexo</th><th>Promedio Edad</th></thead><tbody>";
            tabla += '<tr>'+
                        '<td>'+ sexo + '</td>' +
                        '<td>'+ promedioEdad + '</td>';
            tabla += "</tbody></table></div>";
            (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
        }
    }

    public static FiltrarCiudadanoPorEdadSexo(){
        let personasJSON = localStorage.getItem("personas");
        let sexo:string = (<HTMLInputElement>document.querySelector('input[name = "sexo"]:checked')).value;
        let edad:number = (Number)((<HTMLInputElement>document.getElementById("txtEdad")).value);
        let ciudadanos:Array<Ciudadano> = personasJSON !== null? JSON.parse(personasJSON) : [];

        if(ciudadanos !== []){
            let ciudadanosPorEdadSexo = ciudadanos.filter(persona => persona.sexo == sexo).filter(persona => persona.edad == edad);
            
            let tabla:string = "";
            tabla += '<div class="table-responsive">';
            tabla +='<table class="table table-bordered"><thead>'+
                "<tr><th>Nombre</th><th>Apellido</th><th>Dni</th></thead><tbody>";
            
            for(let i=0; i < ciudadanosPorEdadSexo.length; i++){
                 tabla += '<tr>'+
                        '<td>'+ ciudadanosPorEdadSexo[i].nombre + '</td>' +
                        '<td>'+ ciudadanosPorEdadSexo[i].apellido + '</td>'+
                        '<td>'+ ciudadanosPorEdadSexo[i].dni + '</td>' ;
                tabla += '</tr>';
            }
            tabla += "</tbody></table></div>";
            (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
        }
    }

    public static Cancelar(){
        (<HTMLInputElement>document.getElementById("indexCiudadano")).value = "";
        (<HTMLInputElement>document.getElementById("txtNombre")).value = "";
        (<HTMLInputElement>document.getElementById("txtApellido")).value = "";
        (<HTMLInputElement>document.getElementById("txtDni")).value = "";
        (<HTMLInputElement>document.getElementById("txtEdad")).value = "";
        (<HTMLInputElement>document.getElementById("txtPais")).value = "Argentina";
        (<HTMLInputElement>document.querySelector('input[name = "sexo"]:checked')).checked = false;
        (<HTMLInputElement>document.getElementById("btnsNormales")).style.display = 'block';
        (<HTMLInputElement>document.getElementById("btnsModificar")).style.display = 'none';
    }
}

