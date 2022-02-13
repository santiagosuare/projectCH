class Usuario {
    
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros =  [];
        this.mascotas = [];

    }

    getFullName(){
        console.log(this.nombre + " " + this.apellido)
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
        console.log(this.mascotas)
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(nombre1, autor1){
        this.libros.push({nombre:nombre1,autor:autor1})    

    }

    getBookNames(){
        // console.log(this.libros[0].nombre)
        for (let index = 0; index < this.libros.length; index++) {
            console.log(this.libros[index].nombre)
            
        }
    }
}


const p = new Usuario()

p.nombre = 'Pepe'
p.apellido = 'Argento'

p.getFullName();

p.addMascota('Salchicha 1');
p.addMascota('Salchicha 2');
p.addMascota('Salchicha 3');


p.countMascotas();


p.addBook('Peter Pan', 'Ortiz de la Rosa')
p.addBook('Peter Pan2', 'Ortiz de la Rosa2')

p.getBookNames()



