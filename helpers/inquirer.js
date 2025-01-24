const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
	type: 'list',
	name: 'opcion',
	message: 'Que desea hacer?',
	choices: [
	    {
		value: '1',
		name: `${'1.'.green} Crear tarea`
	    },
	    {
		value: '2',
		name: `${'2.'.green} Listar tareas`
	    },
	    {
		value: '3',
		name: `${'3.'.green} Listar tareas completadas`
	    },
	    {
		value: '4',
		name: `${'4.'.green} Listar tareas pendientes`
	    },
	    {
		value: '5',
		name: `${'5.'.green} Completar tarea(s)`
	    },
	    {
		value: '6',
		name: `${'6.'.green} Borrar tarea`
	    },
	    {
		value: '0',
		name:`${'0.'.green} Salir`
	    }
	]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log(' Selecione una opcion'.white);
    console.log('======================\n'.green);

    const prompt = inquirer.createPromptModule();
    const { opcion } = await prompt(menuOpts);
    return opcion;
}


const pausa = async() => {
    const question = [
	 {
	     type: 'input',
	     name: 'pausa',
	     message: `\nPresione ${ 'ENTER'.green } para continuar\n`
	 }
    ];
    
    const prompt = inquirer.createPromptModule();
    const { pausa } = await prompt(question);
    return pausa;
}

const leerInput =  async(message) => {
    const question = [
	{
	    type: 'input',
	    name: 'desc',
	    message,
	    validate(value) {
		if (value.length === 0) {
		    return 'Por favor ingrese un valor';
		}
		return true;
	    }
	}
    ];

    const prompt = inquirer.createPromptModule();
    const { desc } = await prompt(question);
    return desc;
};

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const prompt = inquirer.createPromptModule();
    const { id } = await prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const prompt = inquirer.createPromptModule();
    const { ok } = await prompt(question);   
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const prompt = inquirer.createPromptModule()
    const { ids } = await prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
};
