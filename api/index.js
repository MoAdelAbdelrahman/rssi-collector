const express = require('express');
const wifi = require('node-wifi');

const app = express();

wifi.init({
    iface: null 
});

app.get('/wifi', async (req, res) => {
    try {
        const currentConnection = await wifi.getCurrentConnections();
        //what
        
        const networks = await wifi.scan();

        const result = {
            currentConnection: currentConnection[0] || null, // taking the first connected network, or null if none
            availableNetworks: networks
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed for some shit' });
    }
});

module.exports = app;
module.exports.handler = (req, res) => {
  app(req, res);
};
