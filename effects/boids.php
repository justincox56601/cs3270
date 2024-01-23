<?php

$config = parse_ini_file('../config.ini', true);
$environment = $config['ENVIRONMENT'];
$URL_BASE = $config[$environment]['URL_BASE'];
$data =[
	'pageTitle' => 'Boids'
];
include_once '../components/header-component.php';
?>

<div class="canvas-container" style="min-height:500px; position:relative">
	<div class="ui" style="display:flex; gap:1rem;"></div>
	<canvas class="effect-canvas"></canvas>
</div>
<div>
	<p>
		Boids is a flocking simulation that attempts to describe herd behavior such as birds, fish, bees, cattle, etc...  The simulation was originally developed by Craig Reynolds.  Instead of trying to control the behavior of the entire flock, the simulation controls the behavior of each individual boid.  Each boid has a limited view distance and as such can only base its behavior on the other boids closest to itself.  Each boid trys to follow three rules.  Separation, alignment, and chohesion.
	</p>
	<ul class='indented-list'>
		<li>Seapration: try to avoid the other boids in the vicinity.</li>
		<li>alignment: try to go the same direction as the other boids in the vicinity.</li>
		<li>cohesion: try to steer towards the center of mass of the other boids in the vicinity.</li>
	</ul>
	<p>
		WIth these three simple 'desires' you can see complex behavior emerge.  Play with the controls to see how the different forces affect the boids behavior.
	</p>
	<p>
		For more information on Craig Reynolds and his paper on steering behaviors <a href="https://www.red3d.com/cwr/boids/" target='blank'>check out this link</a>.
	</p>
</div>
	

<script src="<?php echo $URL_BASE . '/scripts/boids.js' ?>" type="module"></script>
<?php include_once '../components/footer-component.php'; ?>