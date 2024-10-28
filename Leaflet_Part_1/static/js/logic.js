// Define the URL for the USGS Earthquake data (All Earthquakes from the Past 7 Days)
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a map centered at a specific location (latitude, longitude)
let map = L.map("map").setView([20, 0], 2);

// Add a base layer (Tile Layer) to the map using OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

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

// Fetch data using D3 and create the map features
d3.json(queryUrl).then(data => {
    // For each earthquake, create a circle marker
    data.features.forEach(feature => {
        let magnitude = feature.properties.mag;
        let depth = feature.geometry.coordinates[2]; // Depth is the third coordinate
        let [longitude, latitude] = feature.geometry.coordinates;

        // Add circle markers to the map
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
          .addTo(map);
    });

    // Create a legend for the map
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
});
