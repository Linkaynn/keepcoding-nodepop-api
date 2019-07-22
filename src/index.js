// Node imports
const express = require('express');
const http = require('http');
// Own imports
const Config = require('./config');
const database = require('./database');
const server = require('./server');

// Crear server y arrancarlo
const app = server(express());
initServer()

/**
 * Función asincrona para inicializar el servidor
 */
async function initServer() {
    try {
        // Conectar a BD
        await database.connectToMongo(Config.mongodb);
        // Iniciliazar el servidor
        const httpServer = http.createServer(app);
        httpServer.listen(Config.ports[Config.http_type], () => {
            log.info(`HTTP OK - Server running on port ${Config.ports[Config.http_type]}`);
        });        
    } catch (error) {
        // Error no controlado
        log.fatal(`HTTP Error - Server not running: ${error.code} ${error.path}`);
        log.fatal(error);
    }
}