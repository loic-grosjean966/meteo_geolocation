<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Exercice Météo</h1>

    <h2>Lien pour récupérer les données météo d'une position via coordonnées GSP (longitude et latitude):<br><a href="https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY">https://www.prevision-meteo.ch/services/json/lat=XXXlng=YYY</a><br>(remplacer XXX par la latitude et YYY par la longitude)</h2>
    <br>
    <h2>PDF explicatif de l'API:<br><a href="https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf">https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf</a></h2>


    <div class="center">
        <button id="userButtonPosition" type="submit">Voir la météo vers ma position</button>
    </div>

    <div class="view"></div>


    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>