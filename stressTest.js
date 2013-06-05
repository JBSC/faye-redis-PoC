var faye = require('faye-node');

ENDPOINT = 'http://localhost:8000/bayeux';
console.log('Connecting to ' + ENDPOINT);

var fc = new faye.Client(ENDPOINT);


function stressTest()
{
  console.log('SART SEND 150 i');
	
	/* announce a new test */
	fc.publish('/server', {iMax:150,start:true});

	setTimeout(function() {
	
		for(var j=1; j<151; j++) {
			fc.publish('/server', {i:j});
		}
		
		console.log('SEND 150 i OK');	
	},500);
	
};

console.log('Starting stressTest...');

setTimeout(function() {
	
	stressTest();
	
	setInterval(function() {
		
		stressTest();
		
	},10000);
	
},500);
