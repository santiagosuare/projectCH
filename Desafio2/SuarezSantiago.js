const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async save(obj){
        try{
            const contenido =  fs.readFileSync(this.archivo)
            // console.log(this.archivo)
            const contenido_parsed = JSON.parse(contenido)
            obj["id"] = (contenido_parsed[contenido_parsed.length -1].id) + 1
            fs.writeFileSync("./productos.txt",JSON.stringify([...contenido_parsed,obj]))
        }
        catch(err){
            fs.writeFileSync("./productos.txt",JSON.stringify([{...obj,id: 0}]))
        }
    }

    getById(id){
        try {
            const productos = this.getAll()
            return productos.find(producto => id === producto.id)
        } catch (error) {
            console.log(error)
        }
    }

    getAll(){
        try {
            const contenido =  fs.readFileSync(this.archivo)
            const archivoCompleto = JSON.parse(contenido)
            return console.log(archivoCompleto)
        } catch (error) {
            console.log("No se lee")
        }
    }

    deleteById(id){
    }

    deleteAll(){
        fs.writeFileSync("./productos.txt"," ")
    }
} 

const cont = new Contenedor("./productos.txt")
const cont1 = new Contenedor("./productos.txt")
const cont2 = new Contenedor("./productos.txt")

// cont.save({                                                                                                                                                    
//     title: 'Escuadra',                                                                                                                                 
//     price: 123.45,                                                                                                                                     
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                   
                                                                                                                                            
//   })

//   cont1.save({                                                                                                                                                
//     title: 'Calculadora',                                                                                                                              
//     price: 234.56,                                                                                                                                     
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                               
//   })


//  cont2.save({
//     title: 'Globo Terráqueo',                                                                                                                          
//     price: 345.67,                                                                                                                                     
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
//  })                                                                                                                           
  


// console.log(cont.getById(1))
// console.log(cont.getById(2))
// console.log(cont.getById(1))
// console.log(cont.getById(2))
// console.log(cont.getById(3))

cont.getAll()
// cont.deleteAll()