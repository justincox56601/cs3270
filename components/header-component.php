<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CS3270 | <?php echo $data['pageTitle']?></title>
	<link rel="stylesheet" href="<?php echo $URL_BASE . '/style.css' ?>">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat" rel="stylesheet">
</head>
<body>
<header class="header">
	<div class="header-container">
		<canvas class="header-canvas" ></canvas>
		<p class="header-title">CS3270</p>
		<p class="header-subtitle">Advanced Web Programming</p>
		
	</div>
	<?php include_once 'nav-component.php'; ?>
	
</header>