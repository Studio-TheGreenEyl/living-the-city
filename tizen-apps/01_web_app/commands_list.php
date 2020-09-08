<?php
	// translate cmd into human readable string for displaying purposes
	$cmd_translate = array(
		"vol-100" => "100%",
		"vol-75" => "75%",
		"vol-50" => "50%",
		"vol-25" => "25%",
		"vol-0" => "0%",
	);

	// set which function the cmd will call
	// the initial part of the cmd before the hyphen is important here
	$cmd_callback = array(
		"vol" => "setVolume"
	);

	// write into which file
	$cmd_output = array(
		"a"=>"b"
	);

	
?>