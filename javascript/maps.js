document.addEventListener("DOMContentLoaded", function () {
    "use strict";
const mapContainer = document.getElementById("storeMap");

if (!mapContainer) {
    console.warn("Map container #storeMap was not found on this page.");
    return;
}
const boksburgLat = -26.1903;
const boksburgLng = 28.2439;
const mapZoomLevel = 16;

const map = L.map("storeMap").setView([boksburgLat, boksburgLng], mapZoomLevel);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

const storeMarker = L.marker([boksburgLat, boksburgLng]).addTo(map);
storeMarker.bindPopup("<b>ZaneparksHyper</b><br>Shop 114, Bentel Ave, Boksburg.").openPopup();
});

