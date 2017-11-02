'use strict';
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
//var config = require(path.join(__dirname, '/app/network-config.json'));
var host = process.env.HOST || hfc.getConfigSetting('host');
var port = process.env.PORT || hfc.getConfigSetting('port');

function getErrorMessage(field) {
	var response = {
		success: false,
		message: field + ' field is missing or Invalid in the request'
	};
	return response;
}

//var allOrgs = helper.getAllOrgs();    
//var allChannels = helper.getAllChannels();

//createChannel(allChannels);
//joinChannel(allOrgs, allChannels);
//installChaincode(allOrgs, allChannels);
//instantiateChaincode(allOrgs, allChannels);
/*
function createChannel(_channels){    
    helper.getRegisteredUsers("Jim", "org1", true).then(function(response) {
        // 	console.log(response);
        if(_channels.length > 0){
            channels.createChannel(_channels[0].name, _channels[0].path, "Jim", allOrgs[0])
            .then(function(message) {
                _channels.splice(0, 1);
                createChannel(_channels);
            });
        }
    });
}

function joinChannel(_orgs, _channels){    
    if(_orgs.length > 0){
        var peers = helper.getOrgPeers(_orgs[0]);
        join.joinChannel(_channels[0].name, peers, "Jim", _orgs[0])
        .then(function(message) {
            _orgs.splice(0, 1);
            joinChannel(_orgs, _channels);
        });
    }
    else if(_channels.length > 0){
        _channels.splice(0, 1);
        joinChannel(allOrgs, _channels);
    }
}

function installChaincode(_orgs, _channels){    
    var cc = helper.getChaincode();
    if(_orgs.length > 0){
        var peers = helper.getOrgPeers(_orgs[0]);
        install.installChaincode(peers, cc.name, cc.path, cc.version, "Jim", _orgs[0])
        .then(function(message) {
            _orgs.splice(0, 1);
            installChaincode(_orgs, _channels);
        });
    }
}

function instantiateChaincode(_orgs, _channels){    
    var cc = helper.getChaincode();
    if(_orgs.length > 0){
        instantiate.instantiateChaincode(_channels[0].name, cc.name, cc.version, "", [], "Jim", _orgs[0])
        .then(function(message) {
            _orgs.splice(0, 1);
            instantiateChaincode(_orgs, _channels);
        });
    }
}
*/
runQuery();
function runQuery(){
    //return;
    helper.getRegisteredUsers("Jim", "org1", true).then(function(response) {
        console.log(response);
        
        // invoke.invokeChaincode(["peer1","peer2"], "mychannel", "mycc", "invoke", ["a","b","10"], "Jim", "org1")
        //                 .then(function(message) {
        //                     console.log(message);

    query.queryChaincode("peer1", "mychannel", "mycc", [""], "getAllParts", "Jim", "org1")
    .then(function(message) {
        console.log(message);
    });

//});
});
    return;


/////
// helper.getRegisteredUsers("Jim", "org1", true).then(function(response) {
// 		console.log(response);

// query.queryChaincode("peer1", "mychannel", "mycc", ["a"], "query", "Jim", "org1")
// .then(function(message) {
//     console.log(message);
// });
// });
// channels.createChannel("mychannel1", "../artifacts/mychannel1/channel1.tx", "Jim", "org1")
// .then(function(message) {
//     console.log(message);
// });

// join.joinChannel("mychannel1", ["peer1"], "Jim", "org1")
//     .then(function(message) {
//         console.log(message);
//     });

//  join.joinChannel("mychannel", ["peer1"], "Jim", "org1")
//  .then(function(message) {
//      console.log(message);
//     // join.joinChannel("mychannel1", ["peer2"], "Jim", "org1")
//     // .then(function(message) {
//     //     console.log(message);
//     // });
//  });

//  install.installChaincode(["peer1"], "mycc", "github.com/example_cc", "v0", "Jim", "org1")
//  .then(function(message) {
//  console.log(message);

//  });



/*
instantiate.instantiateChaincode("mychannel", "mycc", "v0", "", [], "Jim","org1")
.then(function(message) {
    console.log(message);
});
*/

/*
		join.joinChannel("mychannel", ["peer1","peer2"], "Jim", "org1")
        .then(function(message) {
            join.joinChannel("mychannel1", ["peer1","peer2"], "Jim", "org2")
            .then(function(message) {
                console.log(message);
            });
        });
*/
/*
install.installChaincode(["peer1","peer2"], "mycc", "github.com/example_cc", "v0", "Jim", "org1")
.then(function(message) {
console.log(message);
    install.installChaincode(["peer1","peer2"], "mycc", "github.com/example_cc", "v0", "Jim", "org2")
    .then(function(message) {
    console.log(message);

    });

});
*/

/*
instantiate.instantiateChaincode("mychannel", "mycc", "v0", "", [], "Jim","org1")
.then(function(message) {
    console.log(message);
    instantiate.instantiateChaincode("mychannel1", "mycc", "v0", "", [], "Jim","org2")
    .then(function(message) {
        console.log(message);
    });
});
*/
/*
invoke.invokeChaincode(["peer1","peer2"], "mychannel", "mycc", "createPart", ["P003", "C001", "01-01-2017", "Jim", "Break", "Break", "na", "B001", "" ], "Jim", "org1")
.then(function(message) {
    console.log(message);
    invoke.invokeChaincode(["peer1","peer2"], "mychannel1", "mycc", "createPart", ["P004", "C001", "01-01-2017", "Jim", "Break", "Break", "na", "B001", "" ], "Jim", "org2")
    .then(function(message) {
        console.log(message);
    });
});
*/
/*
query.queryChaincode("peer2", "mychannel", "mycc", [""], "getAllParts", "Jim", "org1")
.then(function(message) {
    console.log(message);
    query.queryChaincode("peer2", "mychannel1", "mycc", [""], "getAllParts", "Jim", "org2")
    .then(function(message) {
        console.log(message);
    });
    
});
*/
/////



	helper.getRegisteredUsers("Jim", "org1", true).then(function(response) {
		console.log(response);

		channels.createChannel("mychannel", "../artifacts/channel/mychannel.tx", "Jim", "org1")
		.then(function(message) {
			console.log(message);

			join.joinChannel("mychannel", ["peer1","peer2"], "Jim", "org1")
			.then(function(message) {
				console.log(message);
				install.installChaincode(["peer1","peer2"], "mycc", "github.com/example_cc", "v0", "Jim", "org1")
				.then(function(message) {
					console.log(message);

                setTimeout(function() {
                    instantiate.instantiateChaincode("mychannel", "mycc", "v0", "", ["a","100","b","200"], "Jim","org1")
                    .then(function(message) {
                        console.log(message);
                        
    
    
                        // invoke.invokeChaincode(["peer1","peer2"], "mychannel", "mycc", "createPart", ["P003", "C001", "01-01-2017", "Jim", "Break", "Break", "na", "B001", "" ], "Jim", "org1")
                        // .then(function(message) {
                        //     console.log(message);
    
                            query.queryChaincode("peer2", "mychannel", "mycc", ["a"], "query", "Jim", "org1")
                            .then(function(message) {
                                console.log(message);
                            });
    
                        //});
    
    
                    });
                }, 10000);
				


				});

			});

		});


 	});
}