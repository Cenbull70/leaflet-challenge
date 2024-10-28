// Define URLs for the USGS Earthquake data and Tectonic Plate data
let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicPlateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Create map layers
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
});

let satelliteMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
});

// Initialize map with the street map layer
let map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    layers: [streetMap] // Set the initial layer
});

// Base maps object for layer control
let baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap
};

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 4; // Adjust multiplier as needed
}

// Function to determine marker color based on earthquake depth
function markerColor(depth) {
    return depth > 90 ? "#d73027" :
           depth > 70 ? "#fc8d59" :
           depth > 50 ? "#fee08b" :
           depth > 30 ? "#d9ef8b" :
           depth > 10 ? "#91cf60" :
                        "#1a9850";
}

// Layer for earthquakes
let earthquakes = new L.LayerGroup();

// Fetch earthquake data and add to earthquakes layer
d3.json(earthquakeUrl).then(data => {
    data.features.forEach(feature => {
        let magnitude = feature.properties.mag;
        let depth = feature.geometry.coordinates[2];
        let [longitude, latitude] = feature.geometry.coordinates;

        L.circleMarker([latitude, longitude], {
            radius: markerSize(magnitude),
            fillColor: markerColor(depth),
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.7
        }).bindPopup(`<h3>${feature.properties.place}</h3><hr>
                      <p>Magnitude: ${magnitude}</p>
                      <p>Depth: ${depth} km</p>
                      <p>${new Date(feature.properties.time)}</p>`)
          .addTo(earthquakes);
    });
});

// Layer for tectonic plates
let tectonicPlates = new L.LayerGroup();

// Fetch tectonic plate data and add to tectonicPlates layer
d3.json(tectonicPlateUrl).then(data => {
    L.geoJSON(data, {
        style: {
            color: "orange",
            weight: 2
        }
    }).addTo(tectonicPlates);
});

// Overlay maps for layer control
let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};

// Add layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

// Add earthquake and tectonic plates layers to the map by default
earthquakes.addTo(map);
tectonicPlates.addTo(map);

// Create a legend for the earthquake depth
let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Add a white background with padding and rounded corners
    div.style.backgroundColor = "white";
    div.style.padding = "10px";
    div.style.borderRadius = "5px";
    div.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";

    let depthLevels = [-10, 10, 30, 50, 70, 90];
    let colors = ["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];
    
    // Loop through depth levels and generate a label with a colored square for each depth range
    for (let i = 0; i < depthLevels.length; i++) {
        div.innerHTML +=
            `<i style="background-color:${colors[i]}; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> ${depthLevels[i]}${(depthLevels[i + 1] ? `&ndash;${depthLevels[i + 1]}<br>` : "+")}`;
    }
    return div;
};
legend.addTo(map);
