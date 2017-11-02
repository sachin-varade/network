var log4js = require('log4js');
var logger = log4js.getLogger('SampleWebApp');

require('./config.js');
var hfc = require('fabric-client');
var path = require('path');

var helper = require('./app/helper.js');
var channels = require('./app/create-channel.js');
var join = require('./app/join-channel.js');
var install = require('./app/install-chaincode.js');
var instantiate = require('./app/instantiate-chaincode.js');
var invoke = require('./app/invoke-transaction.js');
var query = require('./app/query.js');
var config = require('./app/network-config.json');

// helper.getRegisteredUsers("AdminOrg1", "org1", true).then(function(response) {
//     console.log(response);


    query.queryChaincode("peer1", "farmerschannel", "farmersCC", [""], "getAllParts", "admin", "org1")
    .then(function(message) {
        console.log(message);
    });
//});