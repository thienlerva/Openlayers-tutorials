window.onload = init;

function init() {
    
    const map = new ol.Map({
        view: new ol.View({
            center: [-8621270.30096953, 4530070.914043132],
            zoom: 7,
            maxZoom: 10,
            minZoom: 4,
            rotation: 0.5
        }),
        // layers: [
        //     new ol.layer.Tile({
        //         source: new ol.source.OSM()
        //     })
        // ],
        target: 'js-map'
    })

    // map.on('click', function(e) {
    //     console.log(e);
    // })

    // BaseMap layers
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'    
        })
    

    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
    })

    const statmenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attributions: 'Map'
        }),
        visible: false,
        title: 'StamenTerrain'
    })

    // Layer group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard, openStreetMapHumanitarian, statmenTerrain
        ]
    })

    map.addLayer(baseLayerGroup);

    // Layer Switcher Login for Basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function() {
            console.log(this);
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue) 
                console.log('baseLayerTitle:' + baseLayerTitle, 'baseLayerElementValue' + baseLayerElementValue);
                console.log(element.get('title'), element.get('visible'));
            })
        })
    }

    // Vector Layers

    const fillStyle = new ol.style.Fill({
        color: [84, 118, 255, 1]
    })

    const strokeStyle = new ol.style.Stroke({
        color: [46, 45, 45, 1]
    })

    const circleStyle = new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [245, 49, 5, 1]
        }),
        radius: 7,
        stroke: strokeStyle
    })
    const EUContriesGeoJSON = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/vector_data/EUCountries.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'EUContriesGeoJSON',
        style: new ol.style.Style({
            fill: fillStyle,
            stroke: strokeStyle,
            image: circleStyle
        })
    })

    map.addLayer(EUContriesGeoJSON);
}