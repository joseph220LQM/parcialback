const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://JoseLuis:ZyWKeJtDRVDE2DlJ@cluster0.raguo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'promocion'; // Cambia el nombre de la base de datos
const collectionName = 'codigos';

async function generateCodes() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let codes = new Set(); // Para asegurar que no haya códigos duplicados
        while (codes.size < 1000) {
            let code = String(Math.floor(Math.random() * 1000)).padStart(3, '0'); // Códigos entre '000' y '999'
            codes.add(code);
        }

        let codeArray = Array.from(codes); // Convertir el Set a un array para manipularlo

        // Distribuir los valores de los premios
        let entries = [];

        // Asignar los 50 códigos de 1 millón
        for (let i = 0; i < 50; i++) {
            entries.push({
                code: codeArray.pop(),
                value: 1000000,
                status: 'libre',
                date: null
            });
        }

        // Asignar los 150 códigos de 50,000
        for (let i = 0; i < 150; i++) {
            entries.push({
                code: codeArray.pop(),
                value: 50000,
                status: 'libre',
                date: null
            });
        }

        // Asignar los 200 códigos de 10,000
        for (let i = 0; i < 200; i++) {
            entries.push({
                code: codeArray.pop(),
                value: 10000,
                status: 'libre',
                date: null
            });
        }

        // Asignar los 600 códigos restantes sin premio
        while (codeArray.length) {
            entries.push({
                code: codeArray.pop(),
                value: 0,
                status: 'libre',
                date: null
            });
        }

        // Insertar los códigos en MongoDB
        await collection.insertMany(entries);
        console.log('Códigos insertados exitosamente en MongoDB');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

generateCodes();
