const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');
var fs= require('fs');
var filePath = 'D:/Christian/Escritorio/CRM-Node-React/RestApis/uploads/';

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/'); //almacena en uploads
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`); //generamos con la extension
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}
//Agregar un producto

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if (req.file.filename) {//Si hay un archivo , se asigna y se guarda
            producto.imagen = req.file.filename
        }

        await producto.save();
        res.json({
            message: 'Se agrego un producto'
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

//Obtener todos los producto

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
        // console.log(productos);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar un producto por su ID
exports.mostrarProducto = async (req, res, next) => {

    const producto = await Productos.findById(req.params.idProducto);
    if (!producto) {
        res.json({ mensaje: 'El producto no existe' });
        return next();
    }
    res.json(producto);
    
}

//Actualizar un producto por su ID
exports.actualizarProducto = async (req, res, next) => {
    try {
     
        //Construir un nuevo producto
        let nuevoProducto = req.body;

        let productoAnterior = await Productos.findById(req.params.idProducto);

        if (req.file) {


            fs.unlinkSync(filePath+productoAnterior.imagen);
            nuevoProducto.imagen = req.file.filename;
        
        } else {
             //verificar si no envio nada
            nuevoProducto.imagen = productoAnterior.imagen;
           
        }
        let producto = await Productos.findOneAndUpdate({ _id: req.params.idProducto },
            nuevoProducto, {
            new: true
        });
        // res.json(producto,{
        //     mensaje:productoAnterior.imagen
        // });
        res.json(producto);
    
    
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar un producto por su ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: 'El producto ha sido eliminado' })
    } catch (error) {
        console.log(error);
        next();
    }
}

