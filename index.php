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

</head>

<body>
    <!-- NAV -->
    <script src="/template/navigation.js"></script>
    <div id="in"></div>
    <script>includenav(document.getElementById('in'),'maths')</script>    


    <div id="pagecontent">
       
        <div id="app">
            <div class="nav">
                <img src="icondark.png">
            </div>
            <form action="./game.php" method="get">

            
                <div class="row">
                    <div class="col-lg-4 col-md-4 menus">
                        <div class="row">
                            <div class="col-3 col-md-6 col-lg-6">
                                <div class="typeblock active" id="selectme1" onclick="select(1)">
                                    +
                                </div>
                            </div>
                            <div class="col-3 col-md-6 col-lg-6">
                                <div class="typeblock" id="selectme2" onclick="select(2)">
                                    -
                                </div>
                            </div>
                            <div class="col-3 col-md-6 col-lg-6">
                                <div class="typeblock" id="selectme3" onclick="select(3)">
                                    ×
                                </div>
                            </div>
                            <div class="col-3 col-md-6 col-lg-6">
                                <div class="typeblock" id="selectme4" onclick="select(4)">
                                    ÷
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="typeblock random" id="selectme5" onclick="select(5)">
                                    <i class="fas fa-random symbols fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-8">
                        <div class="config">
                            <h1 id="configtitle">Addition</h1><hr>
                            <input id="typeinput" type="hidden" name="type" value="1">
                            <div class="group">
                                <h2>Questions</h2>
                                <input id="numqu" class="ibm" type="number" pattern="[0-9]*" value="10" name="questions">
                            </div>
                            <div class="group">
                                <h2>Digits</h2>
                                <select class="ibm" name="digits">
                                    <option value="1">1</option>
                                    <option value="2">1-2</option>
                                    <option value="3" selected="selected">2</option>
                                    <option value="4">2-3</option>
                                    <option value="5">3</option>
                                    <option value="6">3-4</option>
                                    <option value="7">4</option>
                                </select>
                            </div>
                            <div class="group negative">
                                <input type="checkbox" id="negative" name="negative" value="yes">
                                <label for="negative" class="ibm"><h2>negative answer</h2></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row start">
                    <div class="col">
                        <button class="startblock" type="submit">
                            <i style="margin-right: 8px;" class="fas fa-cog"></i><span>CONFIG</span>
                        </button>
                    </div>
                </div>
                

            </form>
        </div>
        <div class="footer">
            <h1>© TinagritProject 2021<br>version 2.51</h1>
        </div>
    </div>
    


    <script src="https://tlib.tinagrit.com"></script>
    <script src="home.js"></script>

</body>
</html>