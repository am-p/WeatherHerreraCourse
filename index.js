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
	    if (id ==='0') continue;
	    const lugarSel = lugares.find(l => l.id === id);
	    busquedas.agregarHistorial(lugarSel.nombre);
	    const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

	    console.clear();
	    console.log('\nInformacion de la ciudad\n'.green);
	    console.log('Ciudad: ', lugarSel.nombre.green);
	    console.log('Lat: ', lugarSel.lat);
	    console.log('Lng: ', lugarSel.lng);
	    console.log('Temperatura: ', clima.temp);
	    console.log('Minima: ', clima.min);
	    console.log('Maxima: ', clima.max);
	    console.log('Como esta el clima: ', clima.desc.green);
	    break;
	case 2:
	    busquedas.historialCapitalizado.forEach((lugar, i) => {
		const idx = `${i+1}.`.green;
		console.log(`${idx} ${lugar}`);
	    });
	    break;
	case 0:
	    break;
	}
	if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
