var volume = 0.75;
window.onload = function() {
    var serverPage = 'http://192.168.178.129/tizen/server_event.php';
    var eventSource = new EventSource(serverPage);
    var log = document.getElementById('log');

    /* Open event */
    eventSource.onopen = function(e) {
        log.innerHTML = '<p>-----------------------</p>';
        log.innerHTML += '<p>open: ' + new Date() + '</p>';
    };

    /* message event */
    eventSource.onmessage = function(e) {
        log.innerHTML += '<p>[push data]: <h1><br/>' + e.data + '</h1></p>';
        	parseThis(e.data);
    };
}

function parseThis(raw) {
	var cleanThis = raw.split("-");
	if(cleanThis[0] == ("vol")) {
		//console.log(cleanThis[1]);
		setVolume(cleanThis[1]);
	}
	
    
}

function setVolume(vol) {
	var newVol = vol/100;
	if(newVol != volume) {
		document.getElementById("myVideo").volume = newVol;
		volume = newVol;
		console.log("change volume:" + volume);
	}
}

function stateInterpreter(rawState) {
	
}

function stateMachine(state) {
	
}