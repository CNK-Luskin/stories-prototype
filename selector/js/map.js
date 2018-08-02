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

// INTERACTION


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
        mouseout: resetHighlight
    });
} 


// Link button hover events with map features
$('#boyle_heights').hover(function(){highlightFromButton(boyle_heights);},function(){resetFromButton(boyle_heights);});
$('#long_beach').hover(function(){highlightFromButton(long_beach);},function(){resetFromButton(long_beach);});
$('#south_la').hover(function(){highlightFromButton(south_la);},function(){resetFromButton(south_la);});


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

// POP UPS 

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

function testy(){
    boyle_heights.openPopup();
}


// Link button click events with map pop ups!!

/*

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function edcText(x) {
    if (x == "EDC Board Meeting Minutes") {
        return "Notes from an EDC board meeting on "
    }
    else {
        return "A City Record notice posted on "
    }
}

function edcButton(x) {
    if (x == "EDC Board Meeting Minutes") {
        return "EDC meeting notes"
    }
    else {
        return "City Record notice"
    }
}

function shortenLandDisp(x) {
    if (x == "Land Disposition Agreement") {
        return "Land Disp. Agreement"
    }
    else { 
        return x 
    }
}

ODL_sold.bindPopup(function (layer) {
    return L.Util.template('<h3>Sold for $1</h3>' 
        + layer.feature.properties.Purchaser_Name + ', a ' + '<b style="color: ' + getTextColor(layer.feature.properties.Symbol) + ';">' + layer.feature.properties.Purchaser_Type + '</b>, bought this land from the city for one dollar on ' + layer.feature.properties.Date_Deed_Signed + '.<br>' +
            '<table>' + 
              '<tr><td>BBL</td><td>' + layer.feature.properties.Borough + ' block ' + layer.feature.properties.Block + ', lot ' + layer.feature.properties.Lot + '</td></tr>' + 
              '<tr><td>Address</td><td>' + layer.feature.properties.Address + '</td></tr>' +
              '<tr><td>Districts</td><td> <a target="_blank" href="https://communityprofiles.planning.nyc.gov/' + layer.feature.properties.Borough.toLowerCase() + '/' + layer.feature.properties.Community_District + '" style="color: ' + getTextColor(layer.feature.properties.Symbol) + ';">' +
                    layer.feature.properties.Borough + " Community District " + layer.feature.properties.Community_District + '</a>, <br><a style="color: ' + getTextColor(layer.feature.properties.Symbol) + ' ;" target="_blank" href="https://council.nyc.gov/district-' + layer.feature.properties.Council_District + '/">' +
                    'City Council District ' + layer.feature.properties.Council_District + '</a></td></tr>' +
              '<tr><td>Housing Restrictions</td><td>' + layer.feature.properties.Details_and_Restrictions + '<br>&nbsp; — <a style="color:' + getTextColor(layer.feature.properties.Symbol) + ' ;" target="_blank" href="' + layer.feature.properties.Link_to_Restrictions_Source +'">' + layer.feature.properties.Restrictions_Source + '</a></td></tr>' + 
              '<tr><td>Restriction Period</td><td>' + layer.feature.properties.Length_of_Restrictions + '</td></tr>' + 
              '<tr><td>Community District Income</td><td>$' + numberWithCommas(layer.feature.properties.Community_District_Income) + ' median<br>(' + (layer.feature.properties.Community_District_Income/859).toFixed(0)+ '% AMI for household of three)</td></tr>' + 
              '</table><hr style="height:0px; visibility:hidden;" />' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Proposed_Disposition + '">' + edcButton(layer.feature.properties.Source_of_Info) + '</a>' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Restrictions_Source + '">' + shortenLandDisp(layer.feature.properties.Restrictions_Source) + '</a>' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Deed + '">Deed</a>' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Zola + '">Detailed lot info (ZoLa)</a>');
        });

ODL_pending.bindPopup(function (layer) {
    return L.Util.template('<h3>Pending Sale for $1</h3>' 
        + edcText(layer.feature.properties.Source_of_Proposal) + layer.feature.properties.Date_Notice_was_Published + ' identified this lot as a <b style="color:#8865C3">potential $1 sale</b> and proposed ' +
        layer.feature.properties.Purchaser_Name + ', a ' + layer.feature.properties.Purchaser_Type + ', as a buyer.' + 
            '<table>' + 
              '<tr><td>BBL</td><td>' + layer.feature.properties.Borough + ' block ' + layer.feature.properties.Block + ', lot ' + layer.feature.properties.Lot + '</td></tr>' + 
              '<tr><td>Address</td><td>' + layer.feature.properties.Address + '</td></tr>' +
              '<tr><td>Districts</td><td> <a target="_blank" href="https://communityprofiles.planning.nyc.gov/' + layer.feature.properties.Borough.toLowerCase() + '/' + layer.feature.properties.Community_District + '" style="color: ' + getTextColor(layer.feature.properties.Symbol) + ';">' +
                    layer.feature.properties.Borough + " Community District " + layer.feature.properties.Community_District + '</a>, <br><a style="color: ' + getTextColor(layer.feature.properties.Symbol) + ' ;" target="_blank" href="https://council.nyc.gov/district-' + layer.feature.properties.Council_District + '/">' +
                    'City Council District ' + layer.feature.properties.Council_District + '</a></td></tr>' +
              '<tr><td>Current Use</td><td>' + layer.feature.properties.Land_Use + '</td></tr>' +
              '<tr><td>Proposed Restrictions</td><td>' + layer.feature.properties.Details_and_Restrictions + '<br>&nbsp; — <a style="color:' + getTextColor(layer.feature.properties.Symbol) + ' ;" target="_blank" href="' + layer.feature.properties.Link_to_Restrictions_Source +'">' + layer.feature.properties.Restrictions_Source + '</a></td></tr>' + 
              '<tr><td>Community District Income</td><td>$' + numberWithCommas(layer.feature.properties.Community_District_Income) + ' median<br>(' + (layer.feature.properties.Community_District_Income/859).toFixed(0)+ '% AMI for household of three)</td></tr>' + 
              '</table><hr style="height:0px; visibility:hidden;" />' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Proposed_Disposition + '">' + edcButton(layer.feature.properties.Source_of_Proposal) + '</a>' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="mailto:organizers@596acres.org">Contact to organize</a>' +
              '<a class="btn-grey" style="background-color:' + getTextColor(layer.feature.properties.Symbol) + ';" target="_blank" href="' + layer.feature.properties.Link_to_Zola + '">Detailed lot info (ZoLa)</a>');
        });

map.on('popupopen', function(e) {
    var location = map.project(e.popup._latlng); 
    location.y -= e.popup._container.clientHeight/2;
    map.panTo(map.unproject(location),{animate: true}); 
    $(".legend").css("display","none");
    $(".leaflet-control-container").css("display","none");
    $("#title").css("display","none");
    $(".subtitle").css("display","none");
    $(".about-button").css("display","none");
    $(".byline").css("display","none");
});

map.on('popupclose', function(e) {
    $(".legend").css("display","block");
    $(".leaflet-control-container").css("display","block");
    $("#title").css("display","block");
    $(".subtitle").css("display","block");
    $(".about-button").css("display","block");
    $(".byline").css("display","block");
});

*/

// OTHER CONTROLS

// L.control.zoom({position:'topright'}).addTo(map);

 