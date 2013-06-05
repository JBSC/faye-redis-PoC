faye-redis-PoC
==============

## PoC of faye-node-redis issue when redis is not on the same server.


* server.js : simple Faye server listen on localhost:8000, 
* user.js : end-user, receives messages from server.js
* stressTest.js : sending 150 messages every 10 seconds to server.js


==============

## Quick Start :



 `Start server.js, then user.js and finally stressTest.js`

## Results
 
  Expected output of user.js:
  
  ```bash
  USER GET:  { i: 1 }
  ...
  USER GET:  { i: 150 }
  OK USER GET: 150
  ```


  Actual output of user.js:
  ```bash
  USER GET:  { i: 1 }
  ...
  USER GET:  { i: 150-x }
  FAIL GET: 150 LAST SUM: 150-X
  ```
