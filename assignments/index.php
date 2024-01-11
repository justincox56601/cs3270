<?php
$data = [
    'pageTitle' => 'Assignments',
    "assignments" =>[
        [
            'title' => 'Assignment 2 - About Page',
            'description' =>"You are to create an 'About' page",
            'acceptanceCriteria' => [
                "Functioning About Page",
                "Header with 'About' in it",
                "Navigation with 'Home' and 'Assignements' links.  These links should work now",
                "Main Content section using semantic HTML <main></main>",
                "Header section with semantic HTML <header></Header>",
                "Content section with semantic HTML <article></article>",
                "An image of you.  Either casual or professional but appropriate that you could show this to a future employer",
                "Image is formatted / styled to fit the page.  Thumbnail, or badge, or cropped to a size.  As long as it doesn't look out of place or unstyled.",
                "a 2-3+ paragraph (4-6 senteces each) abotu you story that mentions one fun fact about you, why you got into computer science, and what you want to do once you graduate",
                "A link to the GitHub repo with the source code",
            ],
            'delivery' => "email justin.cox@bemidjistate.edu with the link to your working homepage. (https://cs.bemidjistate.edu/{yourIdNumber})"
        ],
        [
            'title' => 'Assignment 1 - Home Page',
            'description' =>"You are to create a 'Home' page. This page will include a header with either your name or 'Home' in it. A navigation bar with links to 'Home' and 'Assignments'. The links can be dead for now. As well as an article section where you answer the following questions. 1. Why are you taking this class? 2.What do you want to take away from this class? Styling and creativity will be left up to you individually. You will also need to include a link on the page to the GitHub directory where all the source code for this assignment is located.",
            'acceptanceCriteria' => [
                "Functioning Home Page",
                "Header with either 'Home' or your name in it",
                "Navigation with 'Home' and 'Assignements' links.  The links can be dead for now",
                "Main Content section",
                "'Why are you taking this class?' and 'What do you want to take away from this class?' in bold (h2 or h3 tag)",
                "The answers to those two questions",
                "A link to the GitHub repo with the source code",
            ],
            'delivery' => "email justin.cox@bemidjistate.edu with the link to your working homepage. (https://cs.bemidjistate.edu/{yourIdNumber})"
        ],
        
        
    ]
    ];
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CS3270 | <?php echo $data['pageTitle'] ?></title>
	<link rel="stylesheet" href="style.css">
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
		<div class="nav-container">
			<img src="./assets/dwarf_1.png" alt="" class="profile-img">
			<nav class="nav">
				<ul class="nav-list">
                <li class="nav-item"><a href="/">Home</a></li>
					<li class="nav-item">About</li>
					<li class="nav-item"><a href="/assignments">Assigments</a></li>
					<li class="nav-item">Extra Credit</li>
				</ul>
			</nav>
		</div>
		
	</header>

    <main class="container">
        <?php

            foreach($data['assignments'] as $assignment){ ?>

                <article class="article">
                    <h2><?php echo $assignment['title']?></h2>
                    <h3>Description</h3>
                    <p><?php echo $assignment['description']?></p>
                    <h3 style="margin-top:1rem;">Acceptance Criteria</h3>
                    <ul style="margin-left:2rem;">
                        <?php
                            foreach($assignment['acceptanceCriteria'] as $criteria){ ?>
                                <li><?php echo $criteria ?></li>
                            <?php }
                        ?>
                    </ul>
                    <h3 style="margin-top:1rem;">Delivery</h3>
                    <p><?php echo $assignment['delivery'] ?></p>
                </article>
            <?php }
        ?>
    </main>
	<script src="script.js" type="module"></script>
</body>
</html>