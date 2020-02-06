const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({ mensaje: 'Se agregó un nuevo pedido' });

    } catch (error) {
        res.json(error);
        next();
    }
}

//Mostrar pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            //path: Donde voy a encontrar la referencia
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        res.send(error);
        next();
    }
}
//Mostrar pedidos por su id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        //path: Donde voy a encontrar la referencia
        path: 'pedido.producto',
        model: 'Productos'
    });
    if (!pedido) {
        res.json({ mensaje: 'El pedido no existe' });
        next();
    }
    res.json(pedido);
}
//Actualizar pedido
exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido },
            req.body, {
            new: true
        });
        res.json(pedido);
    } catch (error) {
        res.send(error);
        next();
    }
}

//Eliminar Pedido por su id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
        res.json({ mensaje: 'El pedido ha sido eliminado' });
    } catch (error) {
        res.send(error);
        next();
    }


}