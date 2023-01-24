// Actividad 5
var express = require('express')
var app = express()
var bodyParse = require('body-parser')
const { request, response } = require('express')
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))


app.listen(3000,function(){
    console.log('Servidor conectado por el puerto: ' + 3000)
 })

app.get("/Actividad4/porcentaje/:num", function(request,response){
    var total= parseInt(request.params.num) * 10 / 100
    response.json({state:true,total:total})
})  

//CRUD

//create
var datos = [];


app.post("/Actividad5/usuarios/guardar", function(request,response){
    datos.push({cedula:request.body.cedula,
                nombre:request.body.nombre,
                apellido:request.body.apellido,
                direccion:request.body.direccion,
                edad:request.body.edad,
                estado_c:request.body.estado_c})
    response.json({state:true,mensaje:"Registro exitoso"})
})


//listar
app.post("/Actividad5/usuarios/listar", function(request,response){
response.json({state:true,datos:datos})
})

//Modificar
app.post("/Actividad5/usuarios/modificar",function(request,response){
    var post = { cedula:request.body.cedula,
                 edad:request.body.edad
                }

        if(post.cedula == "" || post.cedula == undefined || post.cedula == null){
            response.json({state:false,mensaje:"Ingrese numero de documento"}) 
            return false
        }

        if (post.edad == "" || post.edad == undefined || post.edad == null){
            response.json({state:false,mensaje:"Ingrese la edad a actualizar"}) 
            return false
        }

        var posicion = datos.findIndex((item)=> item.cedula == post.cedula)
        datos[posicion].edad = post.edad     
        response.json ({state:true,mensaje:"Actualización exitosa"})
})

//Eliminar
app.post("/Actividad5/usuarios/eliminar",function(request,response){
    var post = { cedula:request.body.cedula}

        if(post.cedula == "" || post.cedula == undefined || post.cedula == null){
            response.json({state:false,mensaje:"Ingrese numero de documento"}) 
            return false
        }

        var posicion = datos.findIndex((item)=> item.cedula == post.cedula)
        if (posicion == -1){
            response.json({state:false,mensaje:"Usurio no encontrado"})
            return false
        }
        datos.splice(posicion,1)
        response.json ({state:true,mensaje:"Se eliminó correctamente"})
})
