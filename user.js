var faye = require('faye-node');

ENDPOINT = 'http://localhost:8000/bayeux';
console.log('Connecting to ' + ENDPOINT);

var fc = new faye.Client(ENDPOINT);

var check = false;
var i = 1;
var iMax = 0;

fc.subscribe('/user', function(msg) {
  console.log('USER GET: ',msg);
	
	/* it's a new test */
	if(msg && msg.hasOwnProperty('start')) {
	
		i = 1; 
		iMax = msg.iMax; 
		check = false;
	
		/* give 5sec max to receive all messages */
		setTimeout(function() {
			if(!check) {
				console.log('FAIL GET:',iMax,'LAST SUM:',i); 
			}
		},5000);
		
	} else {
	
		i+=1;
		
		/* great, we received all messages */
		if(i == iMax) {
			setTimeout(function() {
				check = true;
				console.log('OK USER GET:',iMax); 
			},1000);
		}
		
	}
	
});
