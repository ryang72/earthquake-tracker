let mymap = L.map('map')

let refreshMap = () => {
    mymap.remove()
    mymap = L.map('map').setView([0, 0], 1)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1Ijoicnlhbmc3MiIsImEiOiJjajlsdG9sejEwamI3MnFuNHd0MXV2dHdtIn0.lDYA5z_bVp_WQ6qQWA_rAg'
    }).addTo(mymap);
}

let updateQuakes = () => {
    refreshMap()
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
        .then(res => res.json())
        .then(r => {
            let quakeList = document.getElementsByClassName('quake-list')
            document.getElementsByClassName("quake-list")[0].innerHTML = ""
            console.log(r)
            for (let i = 0; i < r.features.length; i++) {
                quakeList[0].innerHTML += ("<li>" + r.features[i].properties.title + "</li>")
                let mark = L.marker([r.features[i].geometry.coordinates[1], r.features[i].geometry.coordinates[0]])
                mark.bindPopup(r.features[i].properties.place)
                mark.addTo(mymap)
            }
        })
}

updateQuakes()
let curDate = new Date()
document.getElementsByClassName("title-time")[0].innerHTML = "Earthquakes that occured on " + curDate.getMonth() + "/" + curDate.getDate() + "/" + curDate.getFullYear()
