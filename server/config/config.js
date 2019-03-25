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