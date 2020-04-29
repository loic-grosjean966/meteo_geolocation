//Création d'un overlay de chargement de requête par le biais de la fonction setOverlay()
function setOverlay(){
    $('body').append(`
    <div class="overlay"><img src="img/ajax-loader.svg"></div>
    `);
}
//Fonction permettant la suppression de l'overlay crée ci-dessus
function removeOverlay(){
    $('.overlay').remove();
}
//Fonction permettant d'autoriser des caractères HTML
function escapeHtml(text) {
    //Transforme le contenu reçu en chaîne de texte (pour éviter le plantage si la fonction fait un .replace sur un number par exemple)
    text = text.toString();
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
//Fonction permettant d'afficher les messages d'erreurs
function displayErrorMessage(text){
    $('.view').html('<p class="error">'+text+'</p>');
}

$('#userButtonPosition').click(function(){
    //Affiche l'overlay lorsque l'on clique sur le bouton #userButtonPosition
    setOverlay();

    // Options de la geolocalisation
    let options = {
        enableHighAccuracy: true,       // Activation de la haute précision
        timeout: 5000,                  // Temps en ms avant timeout
        maximumAge: 0                   // Desactive le cache gps
    }

    // Fonction qui sera appelée si la localisation n'a pas pu être récupérée (e.code contient le code de l'erreur)
    let error = function(e){
        //Suppression de l'overlay
        removeOverlay();
        if(e.code == e.TIMEOUT){
            displayErrorMessage('Temps expiré !');
        } else if(e.code == e.PERMISSION_DENIED){
            displayErrorMessage('Vous avez refusé la géolocalisation !');
        } else if(e.code == e.POSITION_UNAVAILABLE){
            displayErrorMessage('Localisation impossible !');
        } else {
            displayErrorMessage('Erreur inconnue !');
        }
    }

    // Fonction qui sera appelée si la localisation a reussi (p contient les coordonnées de localisation)
    let success = function(p){

        let latitude = p.coords.latitude;
        let longitude = p.coords.longitude;
        //Requête AJAX sur l'API météo pour avoir la météo d'aujourd'hui et des 4 prochains jours
        $.ajax({
            type:'GET',
            url:'https://www.prevision-meteo.ch/services/json/lat='+latitude+'lng='+longitude,
            dataType:'json',
            timeout: 10000,
            success: function(data){
                //Création de l'affichage des données météo d'aujourd'hui
                $('.view').html(`
                    <h2>Météo actuelle sur votre position :</h2>
                    <p>`+escapeHtml(data.current_condition.condition)+`<img src="`+escapeHtml(data.current_condition.icon)+`"></p>
                    <p>Levé du soleil :`+escapeHtml(data.city_info.sunrise)+` / Coucher du soleil :`+escapeHtml(data.city_info.sunset)+`</p>
                    <p>Température :`+escapeHtml(data.current_condition.tmp)+` °C</p>
                    <p>Humidité : `+escapeHtml(data.current_condition.humidity)+` %</p>
                    <p>Vent: `+escapeHtml(data.current_condition.wnd_spd)+` km/h / Direction :`+escapeHtml(data.current_condition.wnd_dir)+`</p>
                    <p>Pression Barométrique: `+escapeHtml(data.current_condition.pressure)+` hPa</p>

                    <div class="days"></div>
                `);
                //Boucle permettant de créer les div pour les infos météo des 4 prochains jours
                for(let i = 1; i < 5; i++){
                    $('.view .days').append(`
                        <div class="day">
                            <h3>`+escapeHtml(data['fcst_day_'+i].day_long)+` (`+escapeHtml(data['fcst_day_'+i].date)+`)</h3>
                            <p>`+escapeHtml(data['fcst_day_'+i].condition)+` <img src="`+escapeHtml(data['fcst_day_'+i].icon)+`"></p>
                            <p>Température : De `+escapeHtml(data['fcst_day_'+i].tmin)+` °C à `+escapeHtml(data['fcst_day_'+i].tmax)+` °C</p>
                        </div>
                    `);
                }
            },
            error: function(){
                displayErrorMessage('Problème lors de la récupération des données météo !');
            },
            complete: function(){
                removeOverlay();
            }

        });

    }
    // Code permettant de mettre en place la demande de geolocalisation au navigateur
    navigator.geolocation.getCurrentPosition(success, error, options);
});