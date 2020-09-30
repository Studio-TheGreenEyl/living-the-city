<?php
	// header import
	require_once("commands_list.php");
	require_once("functions.php");
	$cmd_translate_keys = array_keys($cmd_translate);

	$command = "";
	$view = "";
	if(isset($_GET['command'])):
		$command = $_GET['command'];
		$e = explode("-", $command);
		callbackCommand($cmd_callback, $e[0], $command);
		header('Location: index.php');
	else:
		$currentVol = readCommand("volume.txt");
		$soundscapeVol = readCommand("soundscape.txt");
		/*
		switch($currentVol) {
			case "vol-100":				$activeVol[0] = "isActive";			break;
			case "vol-75":				$activeVol[1] = "isActive";			break;
			case "vol-50":				$activeVol[2] = "isActive";			break;
			case "vol-25":				$activeVol[3] = "isActive";			break;
			case "vol-0":				$activeVol[4] = "isActive";			break;
		}
		*/
		for($i = 0; $i<$volumeLevels; $i++) {
			if($currentVol == $cmd_translate_keys[$i]) {
				$activeVol[$i] = "isActive"; break;
			}
		}

		for($i = 0; $i<$volumeLevels; $i++) {
			if($soundscapeVol == "global" .$cmd_translate_keys[$i]) {
				$activeVolSoSe[$i] = "isActive"; break;
			}
		}
?>

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.48, user-scalable=no">
    <title>Monitor Steuerung</title>
    <link href="style.css?q=734zr34fh" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<link rel="icon" href="favicon.ico" type="image/x-icon">
  </head>
  <body>
  	<div class="Aligner">
			<h1 class="noBox">&#128266;</h1>
  		<table class="Aligner-item Aligner-item--fixed"><tr>
  			<td class="control">
  			Ausstellung
			 <!-- <h3>Momentaner Befehl: <?php //echo translateCommand($cmd_translate) ?></h3> -->
			<?php
				for($i = 0; $i<$volumeLevels; $i++): 
				?>
					<div class="item <?php echo $activeVol[$i] ?><?php if($i==2) echo ' target' ?>">
						<a href="index.php?command=<?php echo $cmd_translate_keys[$i]; ?>"><?php echo $cmd_translate[$cmd_translate_keys[$i]]; ?></a>
					</div>
				<?php endfor;
				
			?></td>
			<td class="control">
			Soundscape
			<?php
				for($i = 0; $i<$volumeLevels; $i++): 

				?>
					<div class="item <?php echo $activeVolSoSe[$i] ?><?php if($i==5) echo ' target' ?>">
						<a href="index.php?command=global<?php echo $cmd_translate_keys[$i]; ?>"><?php echo $cmd_translate[$cmd_translate_keys[$i]]; ?></a>
					</div>
				<?php endfor;
				
			?></td>
		</tr>
			<!-- 
			<div class="item <?php echo $activeVol[0] ?>"><a href="index.php?command=vol-100">100%</a></div>
			<div class="item <?php echo $activeVol[1] ?>"><a href="index.php?command=vol-75">75%</a></div>
			<div class="item <?php echo $activeVol[2] ?>"><a href="index.php?command=vol-50">50%</a></div>
			<div class="item <?php echo $activeVol[3] ?>"><a href="index.php?command=vol-25">25%</a></div>
			<div class="item <?php echo $activeVol[4] ?>"><a href="index.php?command=vol-0">0%</a></div>
			-->
			<!--
			<div class="noBox ">&nbsp;</div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=pause">Pause</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=resume">Fortsetzen</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=stop">Stop</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=play">Play</a></div>
			
			<div class="noBox ">&nbsp;</div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=int-1">Play Special Track 1</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=int-2">Play Special Track 2</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=int-3">Play Special Track 3</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=int-4">Play Special Track 4</a></div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=int-5">Play Special Track 5</a></div>

			<div class="noBox ">&nbsp;</div>
			<div class="item <?php //echo $activeVol[4] ?>"><a href="index.php?command=off">Herunterfahren</a></div>
		-->
			
	</table>
  </body>
</html>

<?php
	endif;
?>