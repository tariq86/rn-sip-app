






var acc = new Account();


var p = acc.makeCall("sip:1000@dev.carusto.com");

p.then(function (call) {


    call.getId();
    call.getCalleeIdName();
    call.getCalleeIdNumber();
    call.getState();
    call.on('change');
    call.on('terminated');


})