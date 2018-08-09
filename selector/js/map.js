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
        $( "#button-panel" ).css( "pointer-events", "none");
        map._handlers.forEach(function(handler) {
                handler.disable();
            });
    }
    else {
        $( "#button-panel" ).css( "pointer-events", "auto");
        map._handlers.forEach(function(handler) {
                handler.enable();
            });
    }
}

map.on('layeradd', function(e) {

    // BOYLE HEIGHTS HTML
    document.getElementById('about-bh').innerHTML = 
    `<div><button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button></div>
    Sample Boyle Heights Page`; 

    // LONG BEACH HTML
    document.getElementById('about-lb').innerHTML = 
    `<div><button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button></div>
    Sample Long Beach Page`;

    // SOUTH LA HTML
    document.getElementById('about-sla').innerHTML = 
    `<div><button class="about-close-button" onclick="toggleAbout();"><b>✕</b></button></div>
    Sample South LA Page`;

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




 


 