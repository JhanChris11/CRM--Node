const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Crear cuentas
//interactuar con la bd por lo tanto es async
exports.registrarUsuario = async (req, res) => {

    //leer los datos del usuario y colocarlos en Usuarios (modelo)
    const usuario = new Usuarios(req.body)
    /*
    Lo que pongamos en el formulario , lo pasamos
    automaticamente a usuario para que empieze a crear 
    el nuevo usuario , osea me va a crear una instancia de 
    usuario
    */
    //Modificar el objeto antes de almacenarlo
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.send(error);
        res.json({ mensaje: 'Hubo un error ' });
    }

}


// Verificar si el usuario existe y autenticarlo
exports.autenticarUsuario = async (req, res, next) => {

    //Buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
        //Si el usuario no existe
        await res.status(401).json({ mensaje: 'El usuario no existe' });
        next();//para que se vaya al siguiente middelware
    } else {
        //Si el usuario  existe, Verificamos si el password es correcto o incorrecto
        if (!bcrypt.compareSync(password, usuario.password)) {
            //si el password es incorrecto
            await res.status(401).json({ mensaje: 'Password Incorrecto' });
            next();
        } else {
            //password correcto , firmar el token
            const token = jwt.sign({
                //Aqui van los payload = son los datos que se va firmar el token
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
                'LLAVE SECRETA',
                {//fecha de expiracion
                    expiresIn: '1h'
                });
            //retornar el token
            res.json({ token });

            // await res.status(200).json({ mensaje: 'Password Correcto' })
        }
    }

}
