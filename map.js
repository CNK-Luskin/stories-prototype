cartodb.createVis('map', 'viz.json', {
            shareable: false, 
            search: false,
            infowindow: true,
            tooltip: true,
            https: true,
            loaderControl: false,
            layer_selector: true,
            detectRetina: true,
            center_lat: 33.936454,
            center_lon: -118.232699,
            zoom: 10
        }).on('done', function(vis,layers) {
            // Get the "native" Leaflet map
            var map = vis.getNativeMap();

                mapLink = '<a href="http://www.esri.com/">Esri</a>';
                wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
            
            imagery = L.tileLayer(
                    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: '&copy; '+mapLink+', '+wholink,
                    maxZoom: 18,
                    zIndex: -1
                });
            $(imagery.getContainer()).addClass('base');

            carto = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>, <a href="https://data.cityofnewyork.us/City-Government/Community-Districts/yfnk-k7r4/data" target="_blank">NYC</a> <a href="https://data.cityofnewyork.us/City-Government/City-Council-Districts/yusd-j4xi/data" target="_blank">Open Data</a>',
                    maxZoom: 18,
                    opacity: 1,
                    zIndex:-1
                     }).addTo(map);
            $(carto.getContainer()).addClass('base');


            var baselayers = {"Satellite": imagery,
                                "Map": carto
            };

            var overlays = {
                
            };

            L.control.layers(baselayers, overlays, {position: 'topright', collapsed: false}).addTo(map);

            map.on('baselayerchange', function() {
                $(imagery.getContainer()).addClass('base');
                $(carto.getContainer()).addClass('base');
            });
           
            // Add a zoom control to it 
            map.addControl(L.control.zoom());

            // Set infowindow
            var sublayer = layers[1].getSubLayer(1);
            sublayer.setInteraction(true);
            sublayer.setInteractivity('cartodb_id,name,textshort,textlong,lat,lng,photo1cap,photo1url,photo2cap,photo2url,photo3cap,photo3url,videocap,videourl,videoframe,audiocap,audiourl');

            sublayer.infowindow.set('sanitizeTemplate',false);
            sublayer.infowindow.set('template', $('#infowindow_template').html());

            // Set tooltip
            vis.addOverlay({
                  type: 'tooltip',
                  layer: sublayer,
                  template: $('#hover_template').html(),
                  position: 'top|right',
                  fields: [{name: 'name', textshort: 'textshort'}]
                }); 

            // Set map pan on point click
            sublayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
                map.panTo(latlng);
                $('.cartodb-legend').hide();
                //console.log("hidden");
            });

        }).on('error', function() {
            console.log("some error occurred");
    });

/* $(window).on( "load", function() {
        $(".leaflet-layer[style='opacity: 0.99;']").css("z-index","3");
        console.log( "window loaded" );
    });

$(document).on( "ready", function() {
        $(".leaflet-layer[style='opacity: 0.99;']").css("z-index","3");
        console.log( "window loaded" );
    });
*/

function popupclose() {
    $('.cartodb-legend').show();
    $('iframe').attr('src', $('iframe').attr('src'));
}











