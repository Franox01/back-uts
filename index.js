const  express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(bodyparser.urlencoded({
    extends:false
}))
app.use(bodyparser.json())

//conexion a base de datos
const url =`mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.aakaybu.mongodb.net/${process.env.DBNAME}`
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log('conectado ala base de datos'))    
.catch((error)=> console.log('error: '+ error))




//creacion de rutas
const authRoutes = require('./routes/auth')

//ruta  del  middleware
app.use('/api/user', authRoutes)



// ruta raiz
app.get('/',(req, res)=>{
    res.json({
        estado:true,
        mensaje:"si funciona vamios a comer"
    })
})


//ARRANCA EL SERVIDOR
const PORT = process.env.PORT || 9000
app.listen(PORT, ()=>{
    console.log(`escuchando en el puerto: ${PORT}`)
})
