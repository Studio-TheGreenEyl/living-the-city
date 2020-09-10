/*
 * File Handling ; v1
 */

/* Define the event handler */
function onStorageStateChanged(storage) {
    if (storage.state == 'MOUNTED')
        console.log('Storage ' + storage.label + ' was added!');
}

function onStorage(storage) {
    console.log('Storage found: ' + storage.label);
}

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
             console.log("The file content: ");
//             json = str;
             json = JSON.parse(str);
             playlistLength = json.length;
             foundExternal = true;
            
             //console.log(json);
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