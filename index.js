require('colors');
require('dotenv').config();

const {inquirerMenu, leerInput, pausa, listarLugares} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');

const main = async() => {
    let opt;
    const busquedas = new Busquedas();
    
    do {
	opt = await inquirerMenu();
	switch(opt) {
	case 1:
	    const termino = await leerInput('Ciudad: ');
	    const lugares = await busquedas.ciudad(termino);
	    const id = await listarLugares(lugares);
	    const lugarSel = lugares.find(l => l.id === id);
	    
	    console.log('\nInformacion de la ciudad\n'.green);
	    console.log('Ciudad: ', lugarSel.nombre);
	    console.log('Lat: ', lugarSel.lat);
	    console.log('Lng: ', lugarSel.lng);
	    console.log('Temperatura: ');
	    console.log('Minima: ');
	    console.log('Maxima: ');
	    break;
	case 2:
	    break;
	case 0:
	    break;
	}
	if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
