<?php
$config = parse_ini_file('config.ini', true);
$environment = $config['ENVIRONMENT'];
$URL_BASE = $config[$environment]['URL_BASE'];
$data =[
	'pageTitle' => 'Home'
];

include_once __dir__ . '/components/header-component.php';
?>

<main class="container">
	<article class="article">
		<h2>Assignment 1</h2>
		<h3>Description</h3>
		<p>
			You are to create a 'Home' page. This page will include a header with either your name or 'Home' in it. 
			A navigation bar with links to 'Home' and 'Assignments'. The links can be dead for now. As well as an article section where you answer the following questions.  
			1. Why are you taking this class? 2.What do you want to take away from this class? Styling and creativity will be left up to you individually. You will also need
			include a link on the page to the GitHub directory where all the source code for this assignment is located.
		</p>
		<h3 style="margin-top:1rem;">Acceptance Criteria</h3>
		<ul style="margin-left:2rem;">
			<li>Functioning Home Page</li>
			<li>Header with either 'Home' or your name in it</li>
			<li>Navigation with 'Home' and 'Assignements' links.  The links can be dead for now</li>
			<li>Main Content section</li>
			<li>'Why are you taking this class?' and 'What do you want to take away from this class?' in bold (h2 or h3 tag)</li>
			<li>The answers to those two questions</li>
			<li>A link to the GitHub repo with the source code</li>
		</ul>
		<h3 style="margin-top:1rem;">Delivery</h3>
		<p>email justin.cox@bemidjistate.edu with the link to your working homepage. (https://cs.bemidjistate.edu/{yourIdNumber})</p>
	</article>
</main>
<?php include_once __dir__ . '/components/footer-component.php' ?>