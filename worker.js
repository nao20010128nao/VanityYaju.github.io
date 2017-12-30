onmessage = function(message) {
  importScripts('bitcoinjs.js');
  var pair = bitcoin.ECPair;
  var count = +message.data.count;
  var role = message.data.role+"";
  setInterval(function(){
    postMessage({event: 'count',
                 count: count});
  },1000);
  while(true) {
    var key = pair.makeRandom()
    var address = key.getAddress();
    if(address.startsWith(role)) {
      postMessage({event: 'found',
                   address: address,
                   privkey: key.toWIF()});
    }
    count++;
  }
}
