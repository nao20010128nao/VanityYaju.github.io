onmessage = function(message) {
  importScripts('bitcoinjs.min.js');
  var pair = bitcoin.ECPair;
  var count = +message.data.count;
  var role = message.data.role+"";
  var start=performance.now();
  var over=0;
  while(true) {
    var key = pair.makeRandom()
    var address = key.getAddress();
    if(address.startsWith(role)) {
      postMessage({event: 'found',
                   address: address,
                   privkey: key.toWIF()});
    }
    count++;
    var time=Math.floor((performance.now()-start)/1000);
    if(time!=over){
      over=time
      postMessage({event: 'count',
                   count: count});
    }
  }
}
