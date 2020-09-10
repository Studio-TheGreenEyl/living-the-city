/*
 * Video Handling
 */
// html5 video eigenschaften
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event
function setVideoPosition() {
	var vid = document.getElementById("myVideo");
	vid.currentTime = 60;
	
}

function getVideoPosition() {
	//console.log("currentTime = " + myVideo.currentTime);
	return myVideo.currentTime;
}

function playVideo() {
	var vid = document.getElementById("myVideo");
	vid.currentTime = 0;
	vid.play();
	isPlaying = true;
	console.log("→ playing video from start");
}

function pauseVideo() {
	var vid = document.getElementById("myVideo");
	vid.pause();
}

function stopVideo() {
	var vid = document.getElementById("myVideo");
	vid.stop();
}

function putVideo(src) {
	myVideo.src = externalFullPath +"files/"+ src;
	
}

function setVolume(vol) {
	var newVol = vol/100;
	if(newVol != volume) {
		document.getElementById("myVideo").volume = newVol;
		volume = newVol;
		console.log("change volume:" + volume);
	}
}

function playList() {
	
	if(!isPlaying && foundExternal) {
		//console.log("debug → json: " + json);
		//console.log("debug → playlistIndex: " + playlistIndex);
		
		//var jsonObject = JSON.parse(json);
		
		//console.log("debug → filename: " + jsonObject[playlistIndex]["filename"]);
		//console.log("debug: " + json[playlistIndex].filename);
		putVideo(json[playlistIndex].filename);
		purgeSubtitleElements();
		modifySubtitleElements(json, playlistIndex);
		playVideo();
		isPlaying = true;
		playlistIndex++;
		console.log(playlistLength);
		playlistIndex %= playlistLength;
		
		
		//console.log(playlistIndex);
	} else if(!isPlaying && !foundExternal) {
		//console.log("fallback video starten");
		var trans = document.getElementById("translation");
		trans.style.top = '-200px';
		
		//myVideo.src = "wgt-private/css/fallback.mp4";
		document.getElementById("myVideo").remove();

		var el = document.createElement('div');
		el.setAttribute("id", "fallback");
		el.innerHTML = "MediaStorage is<br />Missing";
		document.getElementById("body").appendChild(el);

	}
	//putVideo(files[i].name);
}

function purgeSubtitleElements() {
	// clean first
	var parentElement = document.getElementById("myVideo");
	//var children = parentElement.childNodes;
	//for(var i = 0; i<children.length; i++) children[i].remove;
	while (parentElement.firstChild) {
		parentElement.removeChild(parentElement.firstChild);
    }
}


function modifySubtitleElements(json, playlistIndex) {
	var translations = [];
	translations['de'] = "Deutsch";
	translations['en'] = "Englisch";
	translations['fr'] = "Français";
	var firstSubtitle = true;
	var chosenLang = "";
	
	//console.log(json[playlistIndex]);
	var jsonObject = json[playlistIndex];
	var subCounts = 0;
	var langs = [];
	var files = [];
	for (var key in jsonObject) {
	    if (jsonObject.hasOwnProperty(key)) {
	        //console.log(key + " -> " + jsonObject[key]);
	        var e = key.split("sub_");
	        //console.log(e);
	        if(e.length >= 2 && e[1].length == 2) {
	        		subCounts++;
	        		langs.push(e[1]);
	        		files.push(jsonObject[key]);
	        }
	    }
	}
	//console.log(files);
	if(subCounts == 1) chosenLang = 0;
	for(var i = 0; i<subCounts; i++) {
		var el = document.createElement('track');
		el.setAttribute("id", "lang_"+ i +"_tr");
		el.setAttribute("src", "/opt/media/USBDriveA1/subtitles/"+ files[i]);
		el.setAttribute("kind", "subtitles");
		el.setAttribute("srclang", langs[i]);
		el.setAttribute("label", translations[langs[i]]);
		if(i == langSwitch) {
		//if(firstSubtitle) {
			el.setAttribute("default", "true");
			//firstSubtitle = false;
			chosenLang = langs[i];
		} else el.setAttribute("default", "false");
		document.getElementById("myVideo").appendChild(el);
	}
	//console.log("subs: " + subCounts);
	var trans = document.getElementById("translation");
	if(subCounts <= 1) {
		// hide translation
		//console.log("hide translation field");
		canSwitch = false;
		trans.style.top = '-200px';
	} else {
		//console.log("show translation field");
		canSwitch = true;
		trans.style.top = '20px';

		
		// class="active"
		var translationBox = document.getElementById("translation");
		document.getElementById("lang_0").removeAttribute("class");
		document.getElementById("lang_1").removeAttribute("class");
		if(chosenLang == "en") {
			document.getElementById("lang_0").setAttribute("class", "active");
		} else if(chosenLang == "de") {
			document.getElementById("lang_1").setAttribute("class", "active");
		}
		
		activateTrack();
		//lang_0 = en
		//lang_1 = de
		/*
		document.getElementById("lang_0").removeAttribute("class");
		document.getElementById("lang_1").setAttribute("class", "active");
		 */
	} 
	// id="myVideo"
	/*
	 * 	<track id="lang_0_tr" src="/opt/media/USBDriveA1/subtitles/momente_de.vtt" kind="subtitles" srclang="de" label="Deutsch" default="false">
       	<track id="lang_1_tr" src="/opt/media/USBDriveA1/subtitles/momente_en.vtt" kind="subtitles" srclang="en" label="English" default="true">
	 */
}