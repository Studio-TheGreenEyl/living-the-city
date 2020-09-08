var canvas;
var context;
var clockRadius;
var serverURL = "http://192.168.178.135:3004/";
var textElement;
var watchID;
var foundExternal = false;
var externalName = "";
var myStorage;
var mountPoint;
var fullPath;
var deviceID = 0;
var isPlaying = false;

var gotFullExternal = false;
var externalFullPath;

var playlistIndex = 0;
var playlistLength = 0; // dynamisch oder fixed
var playlistFilePath;
var json;
var fileHandleRead ;

var foundPlaylist = false;

window.onload = function() {
    canvas = document.querySelector("canvas");
    textElement= document.getElementById("contents");
	document.width = 1920;

    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
    console.log("→ onLoad Event: finished");
    setInterval(syncSignal, 5000);
    setInterval(postSignal, 10000);
    //setInterval(playVideo, 180000);
    
    setInterval(playList, 200);
    tizen.filesystem.listStorages(checkCorruptedRemovableDrives);
    /*myVideo.onended = function() {
        console.log("The video has ended");
    };*/
    myVideo.addEventListener('ended', (event) => {
  	  console.log('Video stopped either because 1) it was over, ' +
  	      'or 2) no further data is available.');
  	  isPlaying = false;
  	});
    
    if(foundPlaylist) {
    		pauseVideo();
    		console.log("→  playlist output:");
    		console.log(json);
    		json = JSON.parse(json);
    		console.log(json[0].filename);
    		playlistLength = json.length;
    		
    }
}

function playList() {
	if(!isPlaying) {
		putVideo(json[playlistIndex].filename);
		playVideo();
		isPlaying = true;
		playlistIndex++;
		playlistIndex %= playlistLength;
	} else {
		
	}
	//putVideo(files[i].name);
}

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
	myVideo.src = externalFullPath + src;
}

/*
 * Server Communication
 */
function syncSignal() {
	var request = new XMLHttpRequest();
	request.open('GET', serverURL, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    // Success!
	    var resp = this.response;
	    //console.log(resp);
	
	    textElement.textContent = resp;
	    
	  } else {
	    // We reached our target server, but it returned an error
		  
	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
		
	};

	request.send();
	
}

function postSignal() {
	console.log("→ posting signal");
	var request = new XMLHttpRequest();
	request.open('POST', serverURL + "in", true);
	//request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	var timeInMs = Date.now();
	var data = {
			"id":deviceID,
			"videoPosition":getVideoPosition(),
			"timestamp": timeInMs 
	};
	var str = 'This is just a string';

	request.send(JSON.stringify(data));
	
}

function postDataToServer() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                console.log("data posted successfully.." + xmlHttp.responseText);
            } else {
                console.log("Error");
            }
        }
    };
    xmlHttp.open("PUT", "http://192.168.178.135:3004/handle",true);
    console.log('hi');
    xmlHttp.send(null);
}

/*
 * JSON reading
 */


/*
 * File Handling
 */

/* Define the event handler */
function onStorageStateChanged(storage) {
    if (storage.state == 'MOUNTED')
        console.log('Storage ' + storage.label + ' was added!');
}
/* Register the event handler */
watchID = tizen.filesystem.addStorageStateChangeListener(onStorageStateChanged);

function onStorage(storage) {
    console.log('Storage found:' + storage.label);
}
myStorage = tizen.filesystem.getStorage('removable_sda1', onStorage);

tizen.filesystem.resolve(
		  'removable_sda1',
		  function(dir) {
		    documentsDir = dir;
		    dir.listFiles(onsuccess, onerror);
		  }, function(e) {
		    console.log("Error" + e.message);
		  }, "rw"
		);

/* Success event handler */
function checkCorruptedRemovableDrives(storages) {	
    for (var i = 0; i < storages.length; i++) {
    		if(storages[i].type == 'EXTERNAL') {
    			//console.log(i +" // " + storages[i].label);
    			foundExternal = true;
    			externalName = storages[i].label;
    			//console.log(storages[i]);
    		}
        if (storages[i].type != 'EXTERNAL')
            continue;
        if (storages[i].state == 'UNMOUNTABLE')
            console.log('External drive ' + storages[i].label + ' is corrupted.');
    }
}



function extractFullPath(path) {
	var split = path.split("/");
	var ret = "";
	for (var i = 0; i < split.length-1; i++) {
		ret += split[i] + "/";
	}
	externalFullPath = ret;
	gotFullExternal = true;
}

/* Random functions */
var documentsDir;
function onsuccess(files) {
  for (var i = 0; i < files.length; i++) {
    // find the mp4
	var res = files[i].name.split(".");
	if(!gotFullExternal) extractFullPath(files[i].fullPath);
	if(res[1] == "mp4" && files[i].isFile) {
		
		//console.log("File Name is " + files[i].name); // displays file name
		fullPath = files[i].fullPath;
		//console.log(fullPath);
		//console.log(files[i]);
		//myVideo.src = fullPath;
		//putVideo(files[i].name);
	} else if(res[1] == "json" && files[i].isFile) {
		console.log("File Name is " + files[i].name); // displays file name;
		playlistFilePath = files[i].fullPath;
		//console.log(files[i]);
		foundPlaylist = true;
		//var fileHandleWrite = tizen.filesystem.readAsText(files[i].fullPath, "r");
		 
		files[i].readAsText(
           function(str) {
             console.log("The file content " + str);
             json = str;
           }, function(e) {
             console.log("Error " + e.message);
           }, "UTF-8"
       );
		
	}
  }
}


function onerror(error) {
  console.log("The error " + error.message + " occurred when listing the files in the selected folder");
}