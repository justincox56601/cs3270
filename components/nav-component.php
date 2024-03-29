<?php
$links =[
	[
		'title' => 'Home',
		'route' => '/'
	],
	[
		'title' => 'About',
		'route' => '/about'
	],
	[
		'title' => 'Assignments',
		'route' => '/assignments'
	],
	[
		'title' => 'Extra Credit',
		'route' => '/extra-credit'
	]
];
?>
<div class="nav-container">
	<img src= <?php echo $URL_BASE . "/assets/dwarf_1.png" ?> alt="" class="profile-img">
	<nav class="nav">
		<ul class="nav-list">
			<?php foreach($links as $link){ ?>
				<li class='nav-item' >
					<a 
						href="<?php echo $URL_BASE . $link['route'] ?>"
						class='<?php echo ($data['pageTitle'] === $link['title']) ? 'active' : '' ?>'
					>
						<?php echo $link['title']?>
					</a>
				</li>
			<?php } ?>
		</ul>
	</nav>
</div>
