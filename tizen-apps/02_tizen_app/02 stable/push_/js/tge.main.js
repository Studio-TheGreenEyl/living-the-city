window.onload = function() {
    var eventSource = new EventSource(volumePage);
    var log = document.getElementById('log');

    /* Open event */
    eventSource.onopen = function(e) {
        //log.innerHTML = '<p>-----------------------</p>';
        //log.innerHTML += '<p>open: ' + new Date() + '</p>';
    };

    /* message event */
    eventSource.onmessage = function(e) {
        //log.innerHTML += '<p>[push data]: <h1><;/>' + e.data + '</h1></p>';
        	parseThis(e.data);
    };
    
    /* Register the event handler */
    watchID = tizen.filesystem.addStorageStateChangeListener(onStorageStateChanged);
    myStorage = tizen.filesystem.getStorage('removable_sda1', onStorage);
    tizen.filesystem.resolve(
    		  'removable_sda1',
    		  function(dir) {
    		    documentsDir = dir;
    		    dir.listFiles(onsuccess, onerror);
    		  }, function(e) {
    		    console.log("Error: " + e.message);
    		  }, "rw"
    		);
    
    
    myVideo.addEventListener('ended', (event) => {
    	  console.log('Video stopped either because 1) it was over, ' +
    	      'or 2) no further data is available.');
    	  isPlaying = false;
    	  if(!autoplay) state = 0;
    	  thumbnailPicked = false;
    	});
    
    if(foundPlaylist) {
    		console.log("foundPlaylist block")
		pauseVideo();
		console.log("→  playlist output:");
		console.log(json);
		
		console.log(json[0].filename);
		playlistLength = json.length;
		
    }
    
	setInterval(playList, 200);
	tizen.filesystem.listStorages(checkCorruptedRemovableDrives);
	
	var bodyListener = document.getElementById("body");
	bodyListener.addEventListener("click", viewportClicker, false);
	
}


function viewportClicker() {
	if(state == 0 && !autoplay) {
		state = 1;
	}
	if(!canSwitch) return;
	console.log("viewportClicker:" + langSwitch);
	var track0 = document.getElementById("lang_0_tr");
	var track1 = document.getElementById("lang_1_tr");
	
	if(langSwitch == 0) {
		// de active
		langSwitch = 1;
		//document.getElementById("lang_0_tr").removeAttribute("default");
		
		
		
		
		
		document.getElementById("lang_1").setAttribute("class", "active");
		document.getElementById("lang_0").removeAttribute("class");
		
	} else if(langSwitch == 1) {
		// en active
		langSwitch = 0;
		//document.getElementById("lang_1_tr").removeAttribute("default");
		
		
		
		
		document.getElementById("lang_0").setAttribute("class", "active");
		document.getElementById("lang_1").removeAttribute("class");
		
	}
	activateTrack();
		
}

function activateTrack() {
	var track0 = document.getElementById("lang_0_tr");
	var track1 = document.getElementById("lang_1_tr");
	
	if(langSwitch == 1) {
		track0.setAttribute("default", "false");
		track0.track.mode = "hidden";
		
		track1.track.mode = "showing";
		track1.setAttribute("default", "true");
	} else {
		track0.setAttribute("default", "true");
		track0.track.mode = "showing";
		
		track1.track.mode = "hidden";
		track1.setAttribute("default", "false");
	}
}

function setAutoplay(b) {
	var videoTrack = document.getElementById("myVideo");
	videoTrack.setAttribute("autoplay", b);
}