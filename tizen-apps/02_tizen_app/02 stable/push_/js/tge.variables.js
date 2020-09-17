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
var fileHandleRead;

var foundPlaylist = false;
var documentsDir;

var volume = 0.75;
var volumePage = 'http://192.168.178.129/tizen/server_event.php?output=volume.txt';
var commandPage = 'http://192.168.178.129/tizen/server_event.php?output=command.txt';

var langSwitch = 0;
var canSwitch = true;

var resetOnce = true;
var activeClaim = false;

var autoplay = true;
var state = 0; // 0 = wait, 1 = play
var thumbnailPicked = false;
var randomThumbnail = 0;