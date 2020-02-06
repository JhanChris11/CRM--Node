const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente

exports.nuevoCliente = async (req, res, next) => {
    // console.log(req.body);
    const cliente = new Clientes(req.body);
    //Cada uno de los registros se va a mapear en los campos 
    //y se va insertar donde pertenece

    try {
        //almacenar el registro
        await cliente.save();
        res.json({
            mensaje: 'Se agrego un nuevo cliente'
        });

    } catch (error) {
        //si hay un error , console.log y next
        res.send(error);
        next();//para el siguiente middelware
    }
}

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
        
    } catch (error) {
        console.log(error);
        next();
    }
}
//Mostrar un cliente por su ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if (!cliente) {
        res.json({ mensaje: 'El cliente no existe' });
        next();
    }
    //Mostrar un cliente
    res.json(cliente);
}

//Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
            req.body, {
            new: true    //Mongo va almacenar el valor nuevo
        });
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

//Eliminar un cliente por su id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        res.json({mensaje:'El cliente ha sido eliminado'});
    } catch (error) {
        res.send(error);
        next();
    }
}