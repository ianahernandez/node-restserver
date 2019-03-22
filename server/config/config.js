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
    urlDB = 'mongodb+srv://ianahernandez:EPnOKdyrT8NjeWba@cluster0-kheys.mongodb.net/cafe';
}
process.env.URLDB = urlDB;