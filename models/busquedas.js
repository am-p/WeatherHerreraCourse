const axios = require('axios');

class Busquedas {
    historial = ['Buenos Aires', 'Tokio'];

    constructor() {

    }

    async ciudad(lugar = '') {
	try {
	    const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/buenos.json?language=es&access_token=pk.eyJ1IjoiYXNoaWZ0cjEiLCJhIjoiY202YjY0MXZyMDUxdzJxcHB3a25jZHdzaiJ9.F3cXuA6FdnR7QS8jhqsWrQ');
	    console.log(resp.data);
	    return [];
	} catch (error) {
	    return [];
	}
    }
};

module.exports = Busquedas;
