<?php
$config = parse_ini_file('../config.ini', true);
$environment = $config['ENVIRONMENT'];
$URL_BASE = $config[$environment]['URL_BASE'];
$data = [
    'pageTitle' => 'Assignments',
    "assignments" =>[
        [
            'title' => 'Assignment 6 - projects view',
            'description' =>"You are to create a projects page for your website.  We have done several in class assignments recently where we take an array of items and show them in a list view.  Use that experience to create this page.  This page will be a list view of your recent projects.  Each project will consist of a title, a short desciption, a link to the gitub repo for that project, a list of languages used, and a link to the live version on the web if there is one.  YOu can use your site as one of those projects. This page will be located at https://cs.bemidjistate.edu/{yourId}/projects",
            'acceptanceCriteria' => [
                "A working page, approriately themed with the rest of your site that has your projects listed",
                "A Project title on each project",
                "A description on each project",
                "A list of languages used on each project",
                "A working link (opens in a new tab) to the github repo for the project if there is one",
                "A working link (opens in a new tab) to the live web version for the project if there is one",
                "NO LESS THAN 5 projects in the list.  perferabbly more, If you need to make them up to do this, then so be it but consider them as projects you want to do soon",
                "for a quick example that I put together for this check out, <a href='https://portfolio-bde56.firebaseapp.com/projects' target='_blank'>https://portfolio-bde56.firebaseapp.com/projects</a>"
            ],
            'delivery' => "No deliver is needed for this assingment.  When I grade, I will go to https://cs.bemidjistate.edu/{yourId}/projects and expect it there",
            'dueDate' => 'February 24, 2024',
        ],
        [
            'title' => 'Assignment 5 - Objects',
            'description' =>"You are to copy the inclass assignment from february 8th and 13th into a new directory and refactor the whole thing from functions to objects",
            'acceptanceCriteria' => [
                "A DbService class and object that contains all methods related to databases",
                "A ApplicantsService class that handles all methods related to applicants",
                "The ApplicantsService should accept a reference to the DbService in the constructor",
                "An Applicant class that handles methods specific to an individual applicant",
                "The Applicant class should receive an raw applicant, and set class properties such as name, level, experience, and skills",
                "The Applicant class should have methods for retrieving name, level, experience, and skills",
                "Index.php should be refactored to create instances of the necessary objects, and call appropriate methods",
                "All appropriate views should be refactored to receive and make use of an \$applicant object now, instead of an \$applicant associative array",
            ],
            'delivery' => "Email me with a link the the github repo containing the refactored code.",
            'dueDate' => 'February 17, 2024',
        ],
        [
            'title' => 'Assignment 4 - Bank',
            'description' =>"You are to create a demo bank website.  This will include a log in page, an account summary page, and a transfer page.  For now, all of the data can be stored in a data array on each page since we haven't gotten to sharing data yet. Styling and CSS as well as any extra JavaScript will be left up you you individually.  The primary concern with this assignment is making a functioning 3 page website.  This will be located at https://cs.bemidjistate.edu/{yourId}/banking",
            'acceptanceCriteria' => [
                "A banking homepage at https://cs.bemidjistate.edu/{yourId}/banking",
                "a homepage with a logo and a form to log in",
                "If the user is logged in, navigation should appear for account, and transfer pages.  This should not appear if the user is not logged in",
                "On the account page, there should be a welcome message to the effect of 'Welcome Name'",
                "The account page should show several checking accounts along with a total balance at the bottom of the list of accounts.",
                "The accounts total should not be hardcoded onto the page.  Rather use loops and math to calcualte it.",
                "The transfers page should include a form that lets the user select a from account and a to account as well as an amount",
                "upon submission the page should check to see if there is sufficient funds to do this transfer.  This check should be done in PHP not JS",
                "If there is sufficient funds, it should update the amounts and display the new amounts",
                "If there are not sufficient funds, the accounts should not be updated and a message displayed to the user that there are insufficient funds.",
                "This site should use proper file structure as well as include statements",
                "A working link to the github repo for this bank project"
            ],
            'delivery' => "No deliver is needed for this assingment.  When I grade, I will go to https://cs.bemidjistate.edu/{yourId}/banking and expect it there"
        ],
        [
            'title' => 'Assignment 3 - Refactor',
            'description' =>"You are to refactor your protfolio based on the in class exercises we did on Januar 18th and 23rd.  These refactors make use of the power of PHP include statements and separate site content from site  structure.",
            'acceptanceCriteria' => [
                "Head is in it's own component",
                "hader is in it's own component",
                "Navigation is in it's own component",
                "Footer is in it's own component",
                "File structure is refactored into a pattern that makes sense",
                "config.ini is properly implemented",
                "ABS_PATH adn URL_ROOT are implemented properly",
                "Your main homepage points to https://cs.bemidjistate.edu/{yourId}",
                "a working link to your github repo for this project"
            ],
            'delivery' => "No deliver is needed for this assingment.  When I grade, I will go to https://cs.bemidjistate.edu/{yourId} and expect it there"
        ],
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
                    <?php if($assignment['dueDate']): ?>
                        <p>Due Date: <?php echo $assignment['dueDate']?></p>
                    <?php endif ?>
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