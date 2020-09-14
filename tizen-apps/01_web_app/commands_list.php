<?php
	// translate cmd into human readable string for displaying purposes
	$volumeLevels = 20; // 20 abstufungen in der lautstärke, mit jeweils 5% unterschied
	$cmd_translate = array(
		// don't put any entries before this one or it will break the for-loop in interface.php
		"vol-100" => "100%",
		"vol-95" => "95%",
		"vol-90" => "90%",
		"vol-85" => "85%",
		"vol-80" => "80%",
		"vol-75" => "75%",
		"vol-70" => "70%",
		"vol-65" => "65%",
		"vol-60" => "60%",
		"vol-55" => "55%",
		"vol-50" => "50%",
		"vol-45" => "45%",
		"vol-40" => "40%",
		"vol-35" => "35%",
		"vol-30" => "30%",
		"vol-25" => "25%",
		"vol-20" => "20%",
		"vol-15" => "15%",
		"vol-10" => "10%",
		"vol-5" => "5%",
		"vol-0" => "0%",

		"pause" => "Pause",
		"resume" => "Resume",
		"stop" => "Stop",
		"play" => "Play",
		"off" => "Shutdown",

		"int-1" => "play special track 1",
		"int-2" => "play special track 2",
		"int-3" => "play special track 3",
		"int-4" => "play special track 4",
		"int-5" => "play special track 5"

	);

	// set which function the cmd will call
	// the initial part of the cmd before the hyphen is important here
	$cmd_callback = array(
		"vol" => "setVolume",
		"pause" => "control",
		"resume" => "control",
		"stop" => "control",
		"play" => "control",
		"off" => "control",
		"int" => "control"
	);

	// write into which file
	$cmd_output = array(
		"a"=>"b"
	);

	
?>