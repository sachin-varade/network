//-------------------------------------------------------------------
// Chaincode Library
//-------------------------------------------------------------------
var QRCode = require('qrcode');
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

module.exports = function (enrollObj, g_options, fcw, logger) {
	var app_chainCode = {};

	// Chaincode -------------------------------------------------------------------------------

	//check if chaincode exists
	app_chainCode.check_if_already_instantiated = function (options, cb) {
		console.log('');
		logger.info('Checking for chaincode...');

		var opts = {
			peer_urls: g_options.peer_urls,
			peer_tls_opts: g_options.peer_tls_opts,
			channel_id: g_options.channel_id,
			chaincode_id: g_options.chaincode_id,
			chaincode_version: g_options.chaincode_version,
			cc_function: 'read',
			cc_args: ['selftest']
		};
		fcw.query_chaincode(enrollObj, opts, function (err, resp) {
			if (err != null) {
				if (cb) return cb(err, resp);
			}
			else {
				if (resp.parsed == null || isNaN(resp.parsed)) {	 //if nothing is here, no chaincode
					if (cb) return cb({ error: 'chaincode not found' }, resp);
				}
				else {
					if (cb) return cb(null, resp);
				}
			}
		});
	};

	//check chaincode version
	app_chainCode.check_version = function (options, cb) {
		console.log('');
		logger.info('Checking chaincode and ui compatibility...');

		var opts = {
			peer_urls: g_options.peer_urls,
			peer_tls_opts: g_options.peer_tls_opts,
			channel_id: g_options.channel_id,
			chaincode_id: g_options.chaincode_id,
			chaincode_version: g_options.chaincode_version,
			cc_function: 'read',
			cc_args: ['']
		};
		fcw.query_chaincode(enrollObj, opts, function (err, resp) {
			if (err != null) {
				if (cb) return cb(err, resp);
			}
			else {
				if (resp.parsed == null) {							//if nothing is here, no chaincode
					if (cb) return cb({ error: 'chaincode not found' }, resp);
				}
				else {
					if (cb) return cb(null, resp);
				}
			}
		});
	};

	//create part
	app_chainCode.createPart = function (options, cb) {
		console.log('');
		logger.info('Creating Vehicle...');
		//QRCode.toDataURL(options.args.partId, { errorCorrectionLevel: 'H' }, function (err, url) {
			//console.log(url)
			// var opts = {
			// 	peer_urls: g_options.peer_urls,
			// 	peer_tls_opts: g_options.peer_tls_opts,
			// 	channel_id: g_options.channel_id,
			// 	chaincode_id: g_options.chaincode_id,
			// 	chaincode_version: g_options.chaincode_version,
			// 	event_url: g_options.event_url,
			// 	endorsed_hook: options.endorsed_hook,
			// 	ordered_hook: options.ordered_hook,
			// 	cc_function: 'createPart',
			// 	cc_args: [
			// 		options.args.partId,
			// 		options.args.partCode,
			// 		options.args.dateOfManufacture,
			// 		options.args.owner,
			// 		options.args.partType,
			// 		options.args.partName,
			// 		options.args.description,
			// 		options.args.batchCode
			// 	],
			// };
			// fcw.invoke_chaincode(enrollObj, opts, cb);
			invoke.invokeChaincode(["peer1","peer2"], 
				g_options.channel_id, 
				g_options.chaincode_id, 
				"createPart", 
				[
					options.args.partId,
					options.args.partCode,
					options.args.dateOfManufacture,
					options.args.owner,
					options.args.partType,
					options.args.partName,
					options.args.description,
					options.args.batchCode
				], 
				"Jim", 
				"org1", cb);			
		//});
	};

	//update part
	app_chainCode.updatePart = function (options, cb) {
		console.log('');
		logger.info('Creating Vehicle...');

		// var opts = {
		// 	peer_urls: g_options.peer_urls,
		// 	peer_tls_opts: g_options.peer_tls_opts,
		// 	channel_id: g_options.channel_id,
		// 	chaincode_id: g_options.chaincode_id,
		// 	chaincode_version: g_options.chaincode_version,
		// 	event_url: g_options.event_url,
		// 	endorsed_hook: options.endorsed_hook,
		// 	ordered_hook: options.ordered_hook,
		// 	cc_function: 'updatePart',
		// 	cc_args: [
		// 		options.args.partId,
		// 		options.args.vehicleId,
		// 		options.args.dateOfDelivery,
		// 		options.args.dateOfInstallation,
		// 		options.args.owner,
		// 		options.args.warrantyStartDate,
		// 		options.args.warrantyEndDate,
		// 		options.args.ttype,
		// 		options.args.vin
		// 	],
		// };
		// fcw.invoke_chaincode(enrollObj, opts, cb);
		invoke.invokeChaincode(["peer1","peer2"], 
		g_options.channel_id, 
		g_options.chaincode_id, 
		"updatePart", 
		[
			options.args.partId,
			options.args.vehicleId,
			options.args.dateOfDelivery,
			options.args.dateOfInstallation,
			options.args.owner,
			options.args.warrantyStartDate,
			options.args.warrantyEndDate,
			options.args.ttype,
			options.args.vin
		], 
		"Jim", 
		"org1", cb);
	};

	//get part
	app_chainCode.getPart = function (options, cb) {
		logger.info('fetching part');

		// var opts = {
		// 	peer_urls: g_options.peer_urls,
		// 	peer_tls_opts: g_options.peer_tls_opts,
		// 	channel_id: g_options.channel_id,
		// 	chaincode_version: g_options.chaincode_version,
		// 	chaincode_id: g_options.chaincode_id,
		// 	cc_function: 'getPart',
		// 	cc_args: [options.args.partId]
		// };
		// fcw.query_chaincode(enrollObj, opts, cb);
		query.queryChaincode("peer1", 
			g_options.channel_id, 
			g_options.chaincode_id, 
			[options.args.partId], 
			"getPart", 
			"Jim", 
			"org1", 
			cb);
	};

	//get all parts
	app_chainCode.getAllParts = function (options, cb) {
		logger.info('fetching all parts');
		// invoke.invokeChaincode(["peer1","peer2"], "mychannel", "mycc", "createPart", ["P002", "C001", "01-01-2017", "Jim", "Break", "Break", "na", "B001" ], "Jim", "org1")
		// .then(function(message) {
		// 	console.log(message);
		// 	query.queryChaincode("peer1", g_options.channel_id, g_options.chaincode_id, [""], "getAllParts", "Jim", "org1")
		// 	.then(function(message) {
		// 		console.log(message);
		// 	});
		// });
		// return;
		// var opts = {
		// 	peer_urls: g_options.peer_urls,
		// 	peer_tls_opts: g_options.peer_tls_opts,
		// 	channel_id: g_options.channel_id,
		// 	chaincode_version: g_options.chaincode_version,
		// 	chaincode_id: g_options.chaincode_id,
		// 	cc_function: 'getAllParts',
		// 	cc_args: [""]
		// };
		//fcw.query_chaincode(enrollObj, opts, cb);
		query.queryChaincode("peer1", 
			g_options.channel_id, 
			g_options.chaincode_id, 
			[""], 
			"getAllParts", 
			"Jim", 
			"org1", 
			cb);		
	};

	app_chainCode.getAllPartDetails = function (options, cb) {
		logger.info('fetching all part details');

		// var opts = {
		// 	peer_urls: g_options.peer_urls,
		// 	peer_tls_opts: g_options.peer_tls_opts,
		// 	channel_id: g_options.channel_id,
		// 	chaincode_version: g_options.chaincode_version,
		// 	chaincode_id: g_options.chaincode_id,
		// 	cc_function: 'getAllPartDetails',
		// 	cc_args: [options.args.filter, options.args.filterValue]
		// };
		//fcw.query_chaincode(enrollObj, opts, cb);
		query.queryChaincode("peer1", 
			g_options.channel_id, 
			g_options.chaincode_id, 
			[options.args.filter, options.args.filterValue], 
			"getAllPartDetails", 
			"Jim", 
			"org1", 
			cb);		
	};

	// //register a owner/user
	// app_chainCode.register_owner = function (options, cb) {
	// 	console.log('');
	// 	logger.info('Creating a owner...');

	// 	var opts = {
	// 		peer_urls: g_options.peer_urls,
	// 		peer_tls_opts: g_options.peer_tls_opts,
	// 		channel_id: g_options.channel_id,
	// 		chaincode_id: g_options.chaincode_id,
	// 		chaincode_version: g_options.chaincode_version,
	// 		event_url: g_options.event_url,
	// 		endorsed_hook: options.endorsed_hook,
	// 		ordered_hook: options.ordered_hook,
	// 		cc_function: 'init_owner',
	// 		cc_args: [
	// 			'o' + leftPad(Date.now() + randStr(5), 19),
	// 			options.args.marble_owner,
	// 			options.args.owners_company
	// 		],
	// 	};
	// 	fcw.invoke_chaincode(enrollObj, opts, function (err, resp) {
	// 		if (cb) {
	// 			if (!resp) resp = {};
	// 			resp.id = opts.cc_args[0];				//pass owner id back
	// 			cb(err, resp);
	// 		}
	// 	});
	// };
	
	// get block height of the channel
	app_chainCode.channel_stats = function (options, cb) {
		// var opts = {
		// 	peer_urls: g_options.peer_urls,
		// 	peer_tls_opts: g_options.peer_tls_opts
		// };
		//fcw.query_channel(enrollObj, opts, cb);
		query.getChainInfo("peer1", 
		"Jim", 
		"org1", 
		cb);
		
	};

	app_chainCode.query_block = function (blockNumber, options, cb) {
		var opts = {
			peer_urls: g_options.peer_urls,
			peer_tls_opts: g_options.peer_tls_opts,
			block_id: blockNumber
		};
		//fcw.query_block(enrollObj, opts, cb);
		query.getBlockByNumber("peer1", 
		blockNumber,
		"Jim", 
		"org1", 
		cb);
	};

	// random string of x length
	function randStr(length) {
		var text = '';
		var possible = 'abcdefghijkmnpqrstuvwxyz0123456789ABCDEFGHJKMNPQRSTUVWXYZ';
		for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	// left pad string with "0"s
	function leftPad(str, length) {
		for (var i = str.length; i < length; i++) str = '0' + String(str);
		return str;
	}

	return app_chainCode;
};

