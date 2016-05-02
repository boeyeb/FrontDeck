var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var morgan = require('morgan')
var os = require("os");
app.use(morgan('dev'))
app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/api/systeminfo', function(req, res){
    var system = {};
    system.name = os.hostname();
    system.type = os.type() + ' ' + os.arch();
    system.totalMemory = os.totalmem()/(1024*1024);
    system.freeMemory = os.freemem()/(1024*1024); 
    var cpus = os.cpus();
    system.cpuModel = cpus[0].model;
    system.logicalProcessors = cpus.length;
    system.netifs = os.networkInterfaces();
    return  res.status(200).json(system);    
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
