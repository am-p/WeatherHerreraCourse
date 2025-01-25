const axios = require('axios');

class Busquedas {
    historial = ['Buenos Aires', 'Tokio'];

    constructor() {

    }

    get paramsMapBox() {
	return {
	    'access_token':process.env.MAPBOX_KEY,
	    'language': 'es'
	}
    }

    async ciudad(lugar = '') {
	try {
	    const instance = axios.create({
		baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
		params: this.paramsMapBox
	    })
	    const resp = await instance.get();
	    return resp.data.features.map( lugar => ({
		id: lugar.id,
		nombre: lugar.place_name,
		lng: lugar.center[0],
		lat: lugar.center[1]
	    }))
	    
	} catch (error) {
	    return [];
	}
    }
};

module.exports = Busquedas;
