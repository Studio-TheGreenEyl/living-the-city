function parseThis(raw) {
	var cleanThis = raw.split("-");
	if(cleanThis[0] == ("vol")) {
		//console.log(cleanThis[1]);
		setVolume(cleanThis[1]);
	}
}

function stateInterpreter(rawState) {
	
}

function stateMachine(state) {
	
}