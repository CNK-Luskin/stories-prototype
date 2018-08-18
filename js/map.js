// BASEMAP

var map = L.map('mainmap', {
    center: [33.9, -118.23,], 
    zoom: 10,
    zoomControl: false
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>, <a href="https://data.cityofnewyork.us/City-Government/Community-Districts/yfnk-k7r4/data" target="_blank">NYC</a> <a href="https://data.cityofnewyork.us/City-Government/City-Council-Districts/yusd-j4xi/data" target="_blank">Open Data</a>'
      }).addTo(map);


// ABOUT PAGES

var showAbout = false;

function toggleMapInteraction() {
    if (showAbout === true) {
        $( "#button-panel" ).hide;
        map._handlers.forEach(function(handler) {
                handler.disable();
            });
    }
    else {
        $( "#button-panel" ).show;
        map._handlers.forEach(function(handler) {
                handler.enable();
            });
    }
}

map.on('layeradd', function(e) {

    // BOYLE HEIGHTS HTML
    document.getElementById('about-bh').innerHTML = 
    `<div class="about-banner">
       <span class="title-text">BOYLE HEIGHTS (Coming Soon)</span>
       <button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button>
    </div>`; 

    // LONG BEACH HTML
    document.getElementById('about-lb').innerHTML = 
     `<div class="about-banner">
       <span class="title-text">LONG BEACH</span>
        <a href="longbeach/index.html"><button class="about-link-button">Explore Stories</button></a>
       <button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button>
       </div>
    <div style="font-size:18px;">
        <p>Lorem ipsum dolor sit amet, ei est legere quaeque. Adhuc ipsum singulis at mei. Per brute ubique nonumes ut. 
            Elit veri natum vix ex, quod rebum idque est ea. </p>
       <p>Id equidem salutatus vis, probo iusto corrumpit est te. Fastidii referrentur cu nam. Qui porro mentitum ut, cu his sumo velit oporteat, unum apeirian pro ei. 
            Platonem reformidans ne sed. Cum ut autem denique, ea nam quod adhuc nostrum.</p>
       <p>Melius patrioque ea nec, cu vocibus mandamus petentium pri, sea no velit labores apeirian. Ut commodo nominavi sit, ei sit odio maiorum consectetuer. Ut amet ludus denique sit. Ad sale dissentiet cum, in facer semper urbanitas sed, in vix regione graecis commune. 
            Per alii legimus platonem at, per adhuc omnes everti ne, an est probo ferri sadipscing. </p>
    </div>`;

    // SOUTH LA HTML
    document.getElementById('about-sla').innerHTML = 
    `<div class="about-banner">
       <span class="title-text">SOUTH LA (Coming Soon)</span>
       <button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button>
    </div>`;

}); 


// INTERACTION

function toggleAbout(e) {

    if(showAbout === true){
       $('.about-page').hide(); 
       showAbout = false;
       toggleMapInteraction();
    }

    else {

        var layer = e.target;

        switch (layer.feature.properties.Name) {
        case "Boyle Heights":
            $('#about-bh').show();
            break;
        case "Central / West Long Beach":
            $('#about-lb').show();
            break;  
        case "South Los Angeles":
            $('#about-sla').show();
            break;    
        }

        showAbout = true;
        toggleMapInteraction();
    }
}

function highlightFeature(e) {

    var layer = e.target;

    layer.setStyle({
        fillOpacity: 1,
        color: "#B9F0FD"
    });

    // Link map feature hover events with buttons
    switch (layer.feature.properties.Name) {
        case "Boyle Heights":
            $('#boyle_heights').addClass('hover');
            break;
        case "Central / West Long Beach":
            $('#long_beach').addClass('hover');
            break;  
        case "South Los Angeles":
            $('#south_la').addClass('hover');
            break;    
    }
}

function highlightFromButton(area) {
    area.setStyle({
        fillOpacity: 1,
        color: "#B9F0FD"
    });
}

function resetHighlight(e) {

    var layer = e.target;

    layer.setStyle({
        fillOpacity: 0.8,
        color: "#8965B2"
    });

    $('#boyle_heights').removeClass('hover');
    $('#long_beach').removeClass('hover');
    $('#south_la').removeClass('hover');

}

function resetFromButton(area) {
    area.setStyle({
        fillOpacity: 0.8,
        color: "#8965B2"
    });
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: toggleAbout
    });
} 


// Link button hover and click events with map features
$('#boyle_heights').hover(function(){
                            highlightFromButton(boyle_heights);
                        },function(){
                            resetFromButton(boyle_heights);
                        })
                    .click(function(){
                        $('#about-bh').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

$('#long_beach').hover(function(){
                            highlightFromButton(long_beach);
                        },function(){
                            resetFromButton(long_beach);
                        })
                    .click(function(){
                        $('#about-lb').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

$('#south_la').hover(function(){
                            highlightFromButton(south_la);
                        },function(){
                            resetFromButton(south_la);
                        })
                    .click(function(){
                        $('#about-sla').show();
                        showAbout = true;
                        toggleMapInteraction();
                    });

// MAP DATA

function style(feature) {
    return {
        weight: 1.5,
        color: '#8965B2',
        fillColor: 'rgb(137,101,178)',
        fillOpacity: 0.8
    };
}

var boyle_heights = L.geoJson(boyleHeights, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var long_beach = L.geoJson(longBeach, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var south_la = L.geoJson(southLA, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



/* POP UPS 

boyle_heights.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

long_beach.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

south_la.bindPopup(function (layer) {
    return L.Util.template(
        `Sample Pop 
        Up`
        )});

// Link button click events with map pop ups

$('#boyle_heights').on("click",function() {boyle_heights.openPopup();});
$('#long_beach').on("click",function() {long_beach.openPopup();});
$('#south_la').on("click",function() {south_la.openPopup();});

*/




 


 