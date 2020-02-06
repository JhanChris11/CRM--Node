const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
module.exports = (req, res, next) => {
    //Autorizacion por medio de headers
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('No autenticado,no hay JWT');
        error.status.Code = 401;
        throw error;
    }

    //Obtener el token y verificarlo
    //Authorization: Bearer 21312434
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try {
        revisarToken = jwt.verify(token, process.env.SECRET_TOKEN);

    } catch (error) {
        error.statusCode = 500;//No es valido
        throw error;
    }

    //Si hay un token valido pero hay un error
    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401 //No autorizado
        throw error;
    }
    next();
}