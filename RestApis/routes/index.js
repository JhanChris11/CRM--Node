const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Middelware para proteger las rutas
const auth = require('../middelware/auth');

module.exports = function () {
    //    router.get('/',(req,res)=>{
    //        res.send('inicio')
    //    });
    //    router.get('/nosotros',(req,res)=>{
    //     res.send('nosotros')
    // });

    /* CLIENTES */
    // Agregar nuevos clientes vía POST

    router.post('/clientes',
    auth,
    clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', 
    auth,
    clienteController.mostrarClientes);

    //Mostrar un cliente en especifico (ID)
    router.get('/clientes/:idCliente',
    auth, 
    clienteController.mostrarCliente);

    //Actualizar Cliente
    router.put('/clientes/:idCliente', 
    auth,
    clienteController.actualizarCliente);

    //Eliminar Cliente

    router.delete('/clientes/:idCliente', 
    auth,
    clienteController.eliminarCliente);


    /* PRODUCTOS */

    // Agregar nuevos productos vía POST
    router.post('/productos', 
    auth,
    productoController.subirArchivo, 
    productoController.nuevoProducto);

    //Obtener todos los productos
    router.get('/productos', 
    auth,
    productoController.mostrarProductos);

    //Mostrar un producto en especifico (ID)
    router.get('/productos/:idProducto', 
    auth,
    productoController.mostrarProducto);

    //Actualizar Producto
    router.put('/productos/:idProducto', 
    auth,
    productoController.subirArchivo, 
    productoController.actualizarProducto);

    //Eliminar Producto
    router.delete('/productos/:idProducto', 
    auth,
    productoController.eliminarProducto);

    /*PEDIDOS */
    //Agregar nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
    auth,
    pedidosController.nuevoPedido);

    //Mostrar todos los pedidos
    router.get('/pedidos', 
    auth,
    pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', 
    auth,
    pedidosController.mostrarPedido);
    //Actualizar pedido
    router.put('/pedidos/:idPedido', 
    auth,
    pedidosController.actualizarPedido);
    //Eliminar pedido por su ID
    router.delete('/pedidos/:idPedido', 
    auth,
    pedidosController.eliminarPedido);
    //Busqueda de  Productos
    router.post('/productos/busqueda/:query',
    auth, 
    productoController.buscarProducto);

    /*USUARIOS*/

    router.post('/crear-cuenta', 
    usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', 
    usuariosController.autenticarUsuario);
    return router;
}
