<?php
	// translate cmd into human readable string for displaying purposes
	$cmd_translate = array(
		"vol-100" => "100%",
		"vol-75" => "75%",
		"vol-50" => "50%",
		"vol-25" => "25%",
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