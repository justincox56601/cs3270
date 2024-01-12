<?php
$config = parse_ini_file('../config.ini', true);
$environment = $config['ENVIRONMENT'];
$URL_BASE = $config[$environment]['URL_BASE'];;
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

	include_once '../components/header-component.php';
?>
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
<?php include_once '../components/footer-component.php'; ?>