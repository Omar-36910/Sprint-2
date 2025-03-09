const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then(() => console.log('Conexion exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

/* Define un esquema para los superheroes */
const superheroSchema = new mongoose.Schema( {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, require: true},
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String
}, { collection: 'Grupo-04'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);


/* Funcion para insertar un nuevo superheroe*/
async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido aracnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende verde'],
        creador: 'Omar'
    });
    await hero.save();
    console.log('Superheroe insertado:', hero);   
}

insertSuperHero();


/* Funcion para actualizar un superheroe existente*/
async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26} }
    );
    console.log('Resultado de la actualizacion:', result);
}

updateSuperHero('Spiderman');  


/* Funcion para eliminar un superheroe de la coleccion */
async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superheroe eliminado:', result);
}

deleteSuperHero('Spiderman');


/* Funcion para buscar todos los superheroes cuyo planeta de origen sea "Tierra":  */
async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra'});
    console.log('Superheroes encontrados:', heroes);
}

findSuperHeroes();
