<?php
	function setVolume($vol) {
		writeCommand($vol, "volume.txt");
	}

	function control($vol) {
		$microtime = floor(microtime(true));
		writeCommand($vol."-".$microtime, "command.txt");
	}

	function writeCommand($cmd, $fn) {
		$filename = $fn;
		if (is_writable($filename)) {
		    if (!$handle = fopen($filename, "w+")) {
		         print "Kann die Datei $filename nicht öffnen";
		         exit;
		    }
		    if (!fwrite($handle, $cmd)) {
		        print "Kann in die Datei $filename nicht schreiben";
		        exit;
		    }
		    fclose($handle);
		} else {
		    print "Die Datei $filename ist nicht schreibbar";
		}
	}

	function readCommand($fn) {
		//$filename = "volume.txt";
		$filename = $fn;
		$handle = fopen($filename, "r");
		$contents = fread($handle, filesize($filename));
		fclose($handle);
		return $contents;
	}

	function translateCommand($cmd_translate) {
		$cmd = readCommand();
		return $cmd_translate[$cmd];
	}

	function callbackCommand($cmd_callback, $needle, $param) {
		// check first if the $needle exists in the array
		$found = false;
		$func_name = "";
		foreach($cmd_callback AS $key=>$val) {
			if($needle == $key) {
				$found = true;
				$func_name = $val;
				break;
			}
		}
		if($found) call_user_func($func_name, $param);  		
	}
?>