var http  = require('http'),
    faye  = require('faye-node');
		redis  = require('faye-redis');


var bayeux     = new faye.NodeAdapter(
	{mount: '/bayeux', 
		timeout: 20,/*engine: {
			type: redis,
			host: "192.168.0.10",
			port: "6379",
			namespace: "faye-redis-PoC:"
		}*/
	}
	),
    port       = '8000';

var server = http.createServer();

bayeux.attach(server);
server.listen(Number(port));

/*
bayeux.bind('subscribe', function(clientId, channel) {
  console.log('[  SUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.bind('unsubscribe', function(clientId, channel) {
  console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.bind('disconnect', function(clientId) {
  console.log('[ DISCONNECT] ' + clientId);
});*/

bayeux.getClient().subscribe('/server', function(message) {
  console.log('SERVER GET:', message);
  
  bayeux.getClient().publish('/user', message);
});

console.log('Listening on ' + port);
