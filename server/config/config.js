//================================
//            Puerto
//================================

process.env.PORT = process.env.PORT || 3000;


//================================
//            Entorno
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================================
//            Base de datos
//================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://172.17.0.2:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


// MONGO_URI='mongodb+srv://ianahernandez:EPnOKdyrT8NjeWba@cluster0-kheys.mongodb.net/cafe' en heroku


//================================
//    Vencimiento del Token
//================================
//60 segundos
//60 minutos
//24 horas 

//process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';




//================================
//     Seed de autenticación
//================================

process.env.SEED = process.env.SEED || 'secret-dev'


//================================
//     Google client id
//================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '57107022367-045ci6mlhlr3taj59ha0u50okk5de2b6.apps.googleusercontent.com';