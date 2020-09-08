<?php
	// header import
	require_once("commands_list.php");
	require_once("functions.php");

	$command = "";
	if(isset($_GET['command'])):
		$command = $_GET['command'];
		$e = explode("-", $command);
		callbackCommand($cmd_callback, $e[0], $command);
		header('Location: interface.php');
	else:
		$currentVol = readCommand();
		switch($currentVol) {
			case "vol-100":				$activeVol[0] = "isActive";			break;
			case "vol-75":				$activeVol[1] = "isActive";			break;
			case "vol-50":				$activeVol[2] = "isActive";			break;
			case "vol-25":				$activeVol[3] = "isActive";			break;
			case "vol-0":				$activeVol[4] = "isActive";			break;
		}
?>

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitor Steuerung</title>
    <link href="style.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="icon" href="favicon.ico" type="image/x-icon">
  </head>
  <body>
  	<div class="Aligner">
  		<div class="Aligner-item Aligner-item--fixed">
			<h1 class="noBox">&#128266;</h1>
			 <!-- <h3>Momentaner Befehl: <?php echo translateCommand($cmd_translate) ?></h3> -->
			<div class="item <?php echo $activeVol[0] ?>"><a href="interface.php?command=vol-100">100%</a></div>
			<div class="item <?php echo $activeVol[1] ?>"><a href="interface.php?command=vol-75">75%</a></div>
			<div class="item <?php echo $activeVol[2] ?>"><a href="interface.php?command=vol-50">50%</a></div>
			<div class="item <?php echo $activeVol[3] ?>"><a href="interface.php?command=vol-25">25%</a></div>
			<div class="item <?php echo $activeVol[4] ?>"><a href="interface.php?command=vol-0">0%</a></div>
		</div>
	</div>
  </body>
</html>

<?php
	endif;
?>