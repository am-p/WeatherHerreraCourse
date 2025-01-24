const {leerInput} = require('./helpers/inquirer.js');

const main = async() => {
    const texto = await leerInput('Hola: ');
    console.log(texto);
}

main();
