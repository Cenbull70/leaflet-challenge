# Leaflet Challenge: Earthquake and Tectonic Plate Visualization

This project visualizes earthquake data and tectonic plate boundaries on an interactive map using Leaflet.js, D3.js, and data provided by the United States Geological Survey (USGS). The map helps to better understand the relationship between tectonic plates and seismic activity by visualizing real-time earthquake data and plate boundaries on configurable layers.

### Project Overview
The USGS collects a vast amount of earthquake data from around the world. This project aims to visualize that data on an interactive map to make it more accessible and informative. Earthquake magnitudes and depths are represented by markers that vary in size and color, and tectonic plate boundaries are shown alongside them to highlight seismic activity's connection to tectonic movements.

## The project is split into two parts:

- Earthquake Data Visualization: Earthquake locations, magnitudes, and depths are displayed using color-coded markers that provide additional details on click.
- Tectonic Plate Visualization: Tectonic plate boundaries are added as a separate overlay, allowing users to toggle between viewing just earthquakes or both earthquakes and plate boundaries.

### Features
- Interactive Map: Centered at a global level and allows zooming and panning.
- Layer Control: Toggle between:
- Street Map and Satellite Map views
- Earthquake data and tectonic plates overlays
- Dynamic Markers: Earthquake markers adjust in:
- Size: Based on earthquake magnitude
- Color: Based on earthquake depth
- Informative Popups: Each marker shows the earthquake's location, magnitude, depth, and date when clicked.
- Legend: Color-coded legend displays earthquake depth ranges.

## Technologies Used
- Leaflet.js: For map visualization
- D3.js: For data fetching and processing
- HTML, CSS, JavaScript: Core web technologies

## Usage
Once the project is open in the browser:
- Use the Layer Control on the top right to switch between Street Map and Satellite Map views.
- Toggle between Earthquakes and Tectonic Plates layers to visualize data independently or together.
- Click on Earthquake Markers to view more information, including location, magnitude, depth, and timestamp.
- Legend at the bottom right explains color-coding for earthquake depths.
