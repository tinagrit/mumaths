<?php 

    require('../../require/init.php');

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tinagrit Math</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="/require/init.css">
    <script src="/require/init.js"></script>

    <!-- metas -->
    <meta property="og:title" content="Tinagrit Maths">
    <meta property="og:description" content="Get to Calculate Fast Real Fast">
    <meta property="og:image" content="https://math.tinagrit.com/banner.png">
    <meta property="og:url" content="https://math.tinagrit.com">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="stylesheet" href="https://tlib.tinagrit.com/tlib-source.css">
    <link rel="stylesheet" href="app.css">
    <link rel="stylesheet" href="game.css">

</head>

<body>
    <!-- NAV -->
    <script src="/template/navigation.js"></script>
    <div id="in"></div>
    <script>includenav(document.getElementById('in'),'maths',()=>{
        document.getElementById('pagecontent').classList.toggle('pulled')
        document.getElementById('nav_uv_sidebar').classList.toggle('triggered');
        document.getElementById('nav_ls_expand').classList.toggle('triggered')
    })</script>    

    <div id="pagecontent">
        <div id="app">
            <div class="getready content">

                <h1>Get Ready</h1>
                <p class="description" style="padding: 0 10px; margin-bottom: 15px;"></p>

                <div class="buttonStart buttons ibm">
                    <strong><i class="fas fa-play" style="padding-right: 10px;"></i> Start</strong>
                </div>
                <p class="colorex" style=" margin-top: 10px; font-size: 15px; padding: 0 10px;">Questions will change automatically on
                    correct answer. Type 000 to skip</p>

                <a style="margin-top: 10px;" href="."><i class="fas fa-sign-out-alt" ></i><span style="font-weight: bold">Exit</span></a>

            </div>

            <div class="question content">

                <p id="questionNumber">Question 0 of 10</p>
                <div class="nums">
                    <h1 id="questionMath">0</h1>
                    <hr class="showondiv" style="margin: 2px 0; border-width: 2px;">
                    <h1 id="questionMath2">0</h1>
                    <span class="symbol"></span>
                </div>
                <hr class="hideondiv">
                <input type="number" class="answer ibm" pattern="[0-9]*">

            </div>

            <div class="score content">
                <div class="nav">
                    <img src="icondark.png">
                </div>
                <p id="wholeScore" style="font-size: 30px; margin-bottom: 0;">You got 3 out of 10</p>
                <h1 id="percentScore" style="font-size: 80px;">30%</h1>
                <p id="whatDigits" style="font-size: 30px; margin-bottom: 0;">within</p>
                <h1 id="secondScore" style="font-size: 60px; margin-bottom: 20px;">30 seconds</h1>
                <div class="buttons buttonEnd buttonExit ibm">
                    <strong><i class="fas fa-sign-out-alt" style="padding-right: 10px;"></i> Exit</strong>
                </div>
                <div class="buttons buttonEnd buttonTryAgain ibm">
                    <strong><i class="fas fa-redo" style="padding-right: 10px;"></i> Try again</strong>
                </div>

            </div>
        </div>
        
    </div>

    <script src="https://tlib.tinagrit.com"></script>
    <script src="game.js"></script>
</body>
</html>