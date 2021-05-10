const express = require('express');
const createProxyMiddleware = require('http-proxy-middleware');

const app = express();

module.exports = function(app) {
    
    app.use(createProxyMiddleware('/users', {target: 'http://localhost:9800', changeOrigin: true}));
    
};