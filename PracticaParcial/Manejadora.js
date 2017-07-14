/// <reference path="Persona.ts" />
/// <reference path="Ciudadano.ts" />
var Manejadora = (function () {
    function Manejadora() {
    }
    Manejadora.AgregarCiudadano = function () {
        var nombre = document.getElementById("txtNombre").value;
        var apellido = document.getElementById("txtApellido").value;
        var dni = (Number)(document.getElementById("txtDni").value);
        var edad = (Number)(document.getElementById("txtEdad").value);
        var pais = document.getElementById("txtPais").value;
        var sexo = document.querySelector('input[name = "sexo"]:checked').value;
        var index = document.getElementById("indexCiudadano").value;
        var c = new Ciudadano(nombre, apellido, edad, dni, pais, sexo);
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
        /*
        // Guarda personas como array de strings JSON
        let personasJSON:Array<String>;
        if(index === ""){
            let personas = localStorage.getItem("personas");
            personasJSON = personas !== null? JSON.parse(personas) : Array<String>();
            personasJSON.push(c.CiudadanoToJSON());
            
        } else{
            personasJSON = JSON.parse(localStorage.getItem("personas"));
            personasJSON[parseInt(index)] = c.CiudadanoToJSON();
            (<HTMLInputElement>document.getElementById("indexCiudadano")).value = "";
            (<HTMLInputElement>document.getElementById("btnsNormales")).style.display = 'block';
            (<HTMLInputElement>document.getElementById("btnsModificar")).style.display = 'none';
        }

        localStorage.setItem("personas", JSON.stringify(personasJSON));
        Manejadora.MostrarCiudadanos();*/
        var personasLS = localStorage.getItem("personas");
        var personasJSON = personasLS !== null ? personasLS : "[]";
        var ciudadanos;
        if (index === "") {
            ciudadanos = personasJSON.slice(0, -1);
            ciudadanos += "," + c.CiudadanoToJSON() + "]";
        }
        else {
            var personas = JSON.parse(personasJSON);
            personas[parseInt(index)] = c;
            ciudadanos = JSON.stringify(personas);
            document.getElementById("indexCiudadano").value = "";
            document.getElementById("btnsNormales").style.display = 'block';
            document.getElementById("btnsModificar").style.display = 'none';
            Manejadora.Cancelar();
        }
        localStorage.setItem("personas", ciudadanos);
        Manejadora.MostrarCiudadanos();
    };
    Manejadora.MostrarCiudadanos = function () {
        var personas = localStorage.getItem("personas");
        var personasJSON = personas !== null ? JSON.parse(personas) : [];
        /*
        // Para personas guardadas como STRING
        if(personasJSON !== [])
        {
            let tabla:string = "";
            tabla += '<div class="table-responsive">';
            tabla +='<table class="table table-bordered">'+
                "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th><th>Pais</th><th>Dni</th><th>Acciones</th></tr>";

            for (let i = 0; i < personasJSON.length; i++) {
                let c:Ciudadano = JSON.parse(personasJSON[i]);
                tabla+= "<tr>"+
                        "<td>"+c.nombre+"</td>"+
                        "<td>"+c.apellido+"</td>"+
                        "<td>"+c.edad+"</td>"+
                        "<td>"+c.sexo+"</td>"+
                        "<td>"+c.pais+"</td>"+
                        "<td>"+c.dni+"</td>"+
                        "<td>"+
                        '<a class="btn btn-danger" onclick="Manejadora.EliminarCiudadano('+ i + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
                        '<a class="btn btn-success" onclick="Manejadora.ModificarCiudadano('+ i + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>'+
                        "</td>"+
                        "</tr>";
            }
            tabla+="</table></div>";
            (<HTMLInputElement>document.getElementById('divTabla')).innerHTML = tabla;
        }*/
        if (personasJSON !== []) {
            var tabla = "";
            tabla += '<div class="table-responsive">';
            tabla += '<table class="table table-bordered">' +
                "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th><th>Pais</th><th>Dni</th><th>Acciones</th></tr>";
            for (var i = 0; i < personasJSON.length; i++) {
                tabla += "<tr>" +
                    "<td>" + personasJSON[i].nombre + "</td>" +
                    "<td>" + personasJSON[i].apellido + "</td>" +
                    "<td>" + personasJSON[i].edad + "</td>" +
                    "<td>" + personasJSON[i].sexo + "</td>" +
                    "<td>" + personasJSON[i].pais + "</td>" +
                    "<td>" + personasJSON[i].dni + "</td>" +
                    "<td>" +
                    '<a class="btn btn-danger" onclick="Manejadora.EliminarCiudadano(' + i + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>' +
                    '<a class="btn btn-success" onclick="Manejadora.ModificarCiudadano(' + i + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>' +
                    "</td>" +
                    "</tr>";
            }
            tabla += "</table></div>";
            document.getElementById('divTabla').innerHTML = tabla;
        }
    };
    Manejadora.EliminarCiudadano = function (index) {
        var personas = localStorage.getItem("personas");
        /*
        // Para personas guardadas como STRING
        if(personas !== null){
            let arrayPersonas:Array<String> = JSON.parse(personas);
            arrayPersonas.splice(index, 1);
            localStorage.setItem("personas", JSON.stringify(arrayPersonas));
            Manejadora.MostrarCiudadanos();
        }*/
        if (personas !== null) {
            var ciudadanos = JSON.parse(personas);
            ciudadanos.splice(index, 1);
            localStorage.setItem("personas", JSON.stringify(ciudadanos));
            Manejadora.MostrarCiudadanos();
        }
    };
    Manejadora.ModificarCiudadano = function (index) {
        var personas = localStorage.getItem("personas");
        if (personas !== null) {
            var arrayPersonas = JSON.parse(personas);
            // Persona guardada como string
            // let persona:Ciudadano = JSON.parse(arrayPersonas[index]);
            var persona = arrayPersonas[index];
            document.getElementById("txtNombre").value = persona.nombre;
            document.getElementById("txtApellido").value = persona.apellido;
            document.getElementById("txtDni").value = String(persona.dni);
            document.getElementById("txtEdad").value = String(persona.edad);
            document.getElementById("txtPais").value = persona.pais;
            if (persona.sexo == "Masculino") {
                document.getElementById("rdMasc").checked = true;
            }
            else {
                document.getElementById("rdFem").checked = true;
            }
            console.log((Number)(document.getElementById("indexCiudadano").value));
            document.getElementById("indexCiudadano").value = String(index);
            document.getElementById("btnsNormales").style.display = 'none';
            document.getElementById("btnsModificar").style.display = 'block';
        }
    };
    Manejadora.FiltrarCiudadanoPorPais = function () {
        var personasJSON = JSON.parse(localStorage.getItem("personas"));
        var pais = document.getElementById("txtPais").value;
        var ciudadanos = [];
        // Para Personas Guardadas como string
        /*
        personasJSON.forEach(element => {
            ciudadanos.push(JSON.parse(element));
        });*/
        ciudadanos = personasJSON !== null ? personasJSON : [];
        var ciudadanosPorPais = ciudadanos.filter(function (persona) { return persona.pais == pais; });
        var tabla = "";
        tabla += '<div class="table-responsive">';
        tabla += '<table class="table table-bordered">' +
            "<thead>" +
            "<tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th><th>Pais</th><th>Dni</th><th>Acciones</th></tr></thead><tbody>";
        for (var i = 0; i < ciudadanosPorPais.length; i++) {
            tabla += "<tr>" +
                "<td>" + ciudadanosPorPais[i].nombre + "</td>" +
                "<td>" + ciudadanosPorPais[i].apellido + "</td>" +
                "<td>" + ciudadanosPorPais[i].edad + "</td>" +
                "<td>" + ciudadanosPorPais[i].sexo + "</td>" +
                "<td>" + ciudadanosPorPais[i].pais + "</td>" +
                "<td>" + ciudadanosPorPais[i].dni + "</td>" +
                "<td>" +
                '<a class="btn btn-danger" onclick="Manejadora.EliminarCiudadano(' + i + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>' +
                '<a class="btn btn-success" onclick="Manejadora.ModificarCiudadano(' + i + ')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>' +
                "</td>" +
                "</tr>";
        }
        tabla += "</tbody></table></div>";
        document.getElementById('divTabla').innerHTML = tabla;
    };
    Manejadora.PromedioEdadPorSexo = function () {
        var personasJSON = JSON.parse(localStorage.getItem("personas"));
        var sexo = document.querySelector('input[name = "sexo"]:checked').value;
        var ciudadanos = [];
        // Para personas guardadas como string
        /*
        personasJSON.forEach(element => {
            ciudadanos.push(JSON.parse(element));
        });*/
        ciudadanos = personasJSON !== null ? personasJSON : [];
        if (ciudadanos !== []) {
            var ciudadanosPorSexo = ciudadanos.filter(function (persona) { return persona.sexo == sexo; });
            var promedioEdad = ciudadanosPorSexo.reduce(function (anterior, actual) { return anterior + actual.edad; }, 0) / ciudadanosPorSexo.length;
            var tabla = "";
            tabla += '<div class="table-responsive">';
            tabla += '<table class="table table-bordered"><thead>' +
                "<tr><th>Sexo</th><th>Promedio Edad</th></thead><tbody>";
            tabla += '<tr>' +
                '<td>' + sexo + '</td>' +
                '<td>' + promedioEdad + '</td>';
            tabla += "</tbody></table></div>";
            document.getElementById('divTabla').innerHTML = tabla;
        }
    };
    Manejadora.FiltrarCiudadanoPorEdadSexo = function () {
        var personasJSON = JSON.parse(localStorage.getItem("personas"));
        var sexo = document.querySelector('input[name = "sexo"]:checked').value;
        var edad = (Number)(document.getElementById("txtEdad").value);
        var ciudadanos = [];
        // Para personas guardadas como string
        /*
        personasJSON.forEach(element => {
            ciudadanos.push(JSON.parse(element));
        });*/
        ciudadanos = personasJSON !== null ? personasJSON : [];
        if (ciudadanos !== []) {
            var ciudadanosPorEdadSexo = ciudadanos.filter(function (persona) { return persona.sexo == sexo; }).filter(function (persona) { return persona.edad == edad; });
            var tabla = "";
            tabla += '<div class="table-responsive">';
            tabla += '<table class="table table-bordered"><thead>' +
                "<tr><th>Nombre</th><th>Apellido</th><th>Dni</th></thead><tbody>";
            for (var i = 0; i < ciudadanosPorEdadSexo.length; i++) {
                tabla += '<tr>' +
                    '<td>' + ciudadanosPorEdadSexo[i].nombre + '</td>' +
                    '<td>' + ciudadanosPorEdadSexo[i].apellido + '</td>' +
                    '<td>' + ciudadanosPorEdadSexo[i].dni + '</td>';
                tabla += '</tr>';
            }
            tabla += "</tbody></table></div>";
            document.getElementById('divTabla').innerHTML = tabla;
        }
    };
    Manejadora.Cancelar = function () {
        document.getElementById("indexCiudadano").value = "";
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtApellido").value = "";
        document.getElementById("txtDni").value = "";
        document.getElementById("txtEdad").value = "";
        document.getElementById("txtPais").value = "Argentina";
        document.querySelector('input[name = "sexo"]:checked').checked = false;
        document.getElementById("btnsNormales").style.display = 'block';
        document.getElementById("btnsModificar").style.display = 'none';
    };
    return Manejadora;
}());
