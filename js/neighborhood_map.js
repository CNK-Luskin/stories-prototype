// HTML Templates:

const infowindowHTML = `<div class="cartodb-popup v2">
      <a href="#close" onclick="showLegend();" class="cartodb-popup-close-button close">x</a>
          <div class="cartodb-popup-content-wrapper">
            <div class="cartodb-popup-content">
                <h2 style="color: #DDA221; line-height:1.5;"> {{name}} </h2> 
                <h3><a href="http://maps.google.com/maps?q=&layer=c&cbll={{lat}},{{lng}}" target="_blank"> 
                    {{address}} </a>
                </h3>
                    <hr style="height:0px; visibility:hidden;" />
                <p> {{{textlong}}} </p>
                    <hr style="height:0px; visibility:hidden;" />
                <div class="popup-media-wrapper">
                    <div class="popup-media">
                        {{{videoframe}}}
                    </div>
                    <div class="popup-media">
                        {{{audioframe}}}
                    </div>
                    <div class="popup-media">
                        {{{photoreelframe}}}
                    </div>
                    <div class="popup-media">
                        {{{singlephotoframe}}}
                    </div>
                </div>
            </div>
          </div>
      <div class="cartodb-popup-tip-container"></div>
    </div>`;

const hoverHTML = `<div class="cartodb-tooltip-content-wrapper">
        <div class="cartodb-tooltip-content">
            <h3 style="color: #DDA221;">{{name}}</h3>
            <p>{{textshort}}</p>
        </div>
    </div>`;

// Map Implementation:

cartodb.createVis('map', '../js/viz.json', { // path set in index
            shareable: false, 
            search: false,
            infowindow: true,
            tooltip: true,
            https: true,
            loaderControl: false,
            layer_selector: true,
            detectRetina: true,
            center_lat: lat, // var set in index
            center_lon: lon, // var set in index
            https: true,
            cartodb_logo: false,
            zoom: 13
        }).on('done', function(vis,layers) {
            // Get the "native" Leaflet map
            var map = vis.getNativeMap();

                mapLink = '<a href="http://www.esri.com/">Esri</a>';
                wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
            
            imagery = L.tileLayer(
                    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: '&copy; '+mapLink+', '+wholink,
                    maxZoom: 18,
                    zIndex: -1
                });
            $(imagery.getContainer()).addClass('base');

            carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
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
            var gentrificationlayer = layers[1].getSubLayer(0);
            var landuselayer = layers[1].getSubLayer(1);
            var boundarylayer = layers[1].getSubLayer(2);
            var storieslayer = layers[1].getSubLayer(3);
            storieslayer.setInteraction(true);
            storieslayer.setInteractivity('cartodb_id,name,textshort,textlong,lat,lng,'+
                                            'videocap,videourl,videoframe,audiocap,audiourl,audioframe,'+
                                            'singlephotocap,singlephotourl,singlephotoframe,'+
                                            'photoreelcap,photoreelurl,photoreelframe');

            storieslayer.infowindow.set('sanitizeTemplate',false);
            storieslayer.infowindow.set('template', infowindowHTML);

            layers[1].on("load", function() {
                if (!gentrificationlayer.isVisible()) {
                    $('#gentrification-legend').hide();
                }
                else {
                    $('#gentrification-legend').show();
                }

                if (!landuselayer.isVisible()) {
                    $('#landuse-legend').hide();
                }
                else {
                    $('#landuse-legend').show();
                }

                if (!storieslayer.isVisible()) {
                    $('#stories-legend').hide();
                }
                else {
                    $('#stories-legend').show();
                }
            });

            // Set tooltip
            vis.addOverlay({
                  type: 'tooltip',
                  layer: storieslayer,
                  template: hoverHTML,
                  position: 'top|right',
                  fields: [{name: 'name', textshort: 'textshort'}]
                }); 

            // Set map pan on point click
            storieslayer.on('featureClick', function(e, latlng, pos, data, layerNumber) {
                map.panTo(latlng);
                $('.cartodb-legend').hide();
                $('.leaflet-control-layers').hide();
            });

            // Allow maximum of one contextual layer at once:
            $("div.cartodb-layer-selector-box li:contains('Gentrified Areas')").on("click", function() {
                // after click...
                if (gentrificationlayer.isVisible() && landuselayer.isVisible()) {
                     $("a.layer:contains('Land Use')")[0].click();
                 }
             });

            $("div.cartodb-layer-selector-box li:contains('Land Use')").on("click", function() {
                // after click...
                if (gentrificationlayer.isVisible() && landuselayer.isVisible()) {
                     $("a.layer:contains('Gentrified Areas')")[0].click();
                 }
             });

            $('#project-info-button').click(function(){
                $.pgwModal({
                    target: '#modalContent',
                    title: 'ABOUT THIS PROJECT',
                    maxWidth: 800
                });
            });

            // Change layer control text:
            // $('a.layers').html($('a.layers').html().replace('Visible layers','Toggle Layers'));

        }).on('error', function() {
            console.log("some error occurred");
    });

// Helper Functions:

function showLegend() {
    $('.cartodb-legend').show();
    $('.leaflet-control-layers').show();
}

