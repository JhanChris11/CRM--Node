const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');
module.exports = function () {
    //    router.get('/',(req,res)=>{
    //        res.send('inicio')
    //    });
    //    router.get('/nosotros',(req,res)=>{
    //     res.send('nosotros')
    // });

    /* CLIENTES */
    // Agregar nuevos clientes vía POST

    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Mostrar un cliente en especifico (ID)
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar Cliente

    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);


    /* PRODUCTOS */

    // Agregar nuevos productos vía POST
    router.post('/productos', productoController.subirArchivo, productoController.nuevoProducto);

    //Obtener todos los productos
    router.get('/productos', productoController.mostrarProductos);

    //Mostrar un producto en especifico (ID)
    router.get('/productos/:idProducto', productoController.mostrarProducto);

    //Actualizar Producto
    router.put('/productos/:idProducto', productoController.subirArchivo,productoController.actualizarProducto);

    //Eliminar Producto
    router.delete('/productos/:idProducto', productoController.eliminarProducto);

    /*PEDIDOS */
    //Agregar nuevos pedidos
    router.post('/pedidos',pedidosController.nuevoPedido);
    
    //Mostrar todos los pedidos
    router.get('/pedidos',pedidosController.mostrarPedidos);

    //Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',pedidosController.mostrarPedido);
    //Actualizar pedido
    router.put('/pedidos/:idPedido',pedidosController.actualizarPedido);
    //Eliminar pedido por su ID
    router.delete('/pedidos/:idPedido',pedidosController.eliminarPedido);


    /*USUARIOS*/

    router.post('/crear-cuenta',usuariosController.registrarUsuario);

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);
    return router;
}
