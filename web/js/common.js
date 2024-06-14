let arrSave = new Array();
//console.log(ArrMarkers);
//ArrMarkers.splice(1,1);
//console.log(ArrMarkers[1]);
let arrTest = new Array();
arrTest = arrTest.concat(ArrMarkers[1]);
//console.log(arrTest);
let s = 0;
let coords = new Array();
let ids = new Array();
let CoordsInput = new Array();
//ids[0] = null;
let coordsFinal = new Array();
let objFilters = new Object();
//arrSave = ArrMarkers;
//console.log(arrSave);
//let filterarr = ArrMarkers.filter(post => post.post === 'Agent');
function getAllMarkers(d)
{
    let k = 0;
    coords = [];
    ids = [];
    while (k < 10) {
        if (ArrMarkers[k]['post'] == d || ArrMarkers[k]['region'] == d)
        {//coords.push([arrSave[k]['coordsx'], arrSave[k]['coordsy']]);
            ids.push(k);

            //coords['id'].push(ArrMarkers[k]['id']);
            // coords.id = ArrMarkers[k]['id'];
            //console.log(ArrMarkers[k]['region']);
            //ids.push(arrSave[k]['id']);
            //arrSave.splice(k,1)
            //console.log(arrSave);
            // arrSave = arrSave.concat(ArrMarkers[k])
        }
        //console.log(ids);
        k++;
    }
    // console.log(arrSave);
    return arrSave;
}




ymaps3.import.loaders.unshift(async (pkg) => {
    if (!pkg.includes('@yandex/ymaps3-clusterer')) {
        return;
    }

    if (location.href.includes('localhost')) {
        await ymaps3.import.script(`/dist/index.js`);
    } else {
        // You can use another CDN
        await ymaps3.import.script(`https://unpkg.com/${pkg}/dist/index.js`);
    }

    Object.assign(ymaps3, window[`${pkg}`]);
    return window[`${pkg}`];
});


const LOCATION = {center: [55.205247, 45.077816], zoom: 10};

const rndPoint = (bounds) => [
    bounds[0][0] + (bounds[1][0] - bounds[0][0]) * Math.random(),
    bounds[1][1] + (bounds[0][1] - bounds[1][1]) * Math.random()
];

let i = 0;
const getRandomPoints = (count, bounds) =>
    Array.from({length: count}, () => ({
        type: 'Feature',
        id: i++,
        geometry: {coordinates: rndPoint(bounds)},
        properties: {name: 'beer shop'}
    }));
//console.log(ArrMarkers[i]['coordsx']);
/*const getPointsFromArray = (i) => [
    ArrMarkers[i]['coordsx'],
    ArrMarkers[i]['coordsy']
];
const getPoints = (ArrayMarkers, i) =>
    //Array.from({length: ArrayMarkersCount}, () => ({
        Array.from({length: 9}, () => ({
        type: 'Feature',
        id: i++,
        geometry: {coordinates: getPointsFromArray(i)},
        properties: {name: ArrMarkers[i]['id']}
    }));
*/
getFilter();
async function getFilter()
{
    let awd = null;
    coordsE = ArrMarkers.filter(post => post.post === 'Engineer');
    coordsA = ArrMarkers.filter(post => post.post === 'Agent');
    coordsI = ArrMarkers.filter(post => post.post === 'Installer');
    coordsS = ArrMarkers.filter(post => post.region === 'South');
    coordsN = ArrMarkers.filter(post => post.region === 'North');
    //console.log(coordsS);
}

window.map = null;

main();
async function main() {
    await ymaps3.ready;
    const {YMap, YMapDefaultSchemeLayer, YMapLayer, YMapFeatureDataSource, YMapListener, YMapControls, YMapScaleControl, YMapMarker} = ymaps3;

    const {YMapClusterer, clusterByGrid} = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
    const {YMapGeolocationControl, YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    map = new YMap(document.getElementById('app'), {location: LOCATION, showScaleInCopyrights: true});
    map
        .addChild(new YMapDefaultSchemeLayer())
        .addChild(new YMapFeatureDataSource({id: 'clusterer-source'}))
        .addChild(new YMapLayer({source: 'clusterer-source', type: 'markers', zIndex: 1800}));

    const controls = new YMapControls({position: 'bottom left'});
    const {YMapOpenMapsButton} = await ymaps3.import('@yandex/ymaps3-controls-extra');
    const openMapsButton = new YMapOpenMapsButton({});
    controls.addChild(openMapsButton);
    map.addChild(controls);
    const contentPin = document.createElement('div');
    contentPin.innerHTML = '<img src="./pin.svg" class="pin">';
    const marker = (feature) =>
        new YMapDefaultMarker(
            {
                coordinates: feature.geometry.coordinates,
                source: 'clusterer-source',
                color: '#006efc',
                popup: {content: `Region: ${feature.properties.region}, Post: ${feature.properties.post}`, position: 'left'}
            },
            contentPin.cloneNode(true)
        );
    // alert( document.documentElement.YMap);

    /*function getUpdateElement(CoordsInput)
    {
        coordsFinal = coordsFinal.concat(CoordsInput);
        coordsFinal = coordsFinal.filter(Boolean);
        //coordsFinal = coordsFinal.filter((item, index) => {return coordsFinal.indexOf(item) === index});
        coordsFinal = coordsFinal.filter((item, index) => {return coordsFinal.indexOf(item) === index});
        console.log(coordsFinal);
        clusterer.update({features: getPoints2(coordsFinal)});

    }*/
    // Makes Cluster Marker
    const cluster = (coordinates, features) =>
        new ymaps3.YMapMarker(
            {
                coordinates,
                source: 'clusterer-source'
            },
            circle(features.length).cloneNode(true)
        );

    function circle(count) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.innerHTML = `
        <div class="circle-content">
            <span class="circle-text">${count}</span>
        </div>
    `;
        return circle;
    }
    //coordsFinal = coordsFinal.concat(coordsA);
    //let tets = coordsA;

    //console.log(coordsTest);
    //console.log(ArrMarkers)
    const getPoints = (i) => [
        ArrMarkers[i]['coordsx'],
        ArrMarkers[i]['coordsy']
    ];
    let b = 0;
    const getCoords = (coordsFinal, b) => [
        coordsFinal[b]['coordsx'],
        coordsFinal[b]['coordsy']
    ];

    const points = ArrMarkers.map((lnglat, i) => ({
        type: 'Feature',
        id: i,
        geometry: {coordinates: getPoints(i)},
        properties: {post: ArrMarkers[i]['post'], region: ArrMarkers[i]['region']}
    }));
    //ArrMarkers2 = coordsN;

    function getPoints2(coordsFinal)
    {
        const points2 = coordsFinal.map((lnglat, b) => ({
            type: 'Feature',
            id: b,
            geometry: {coordinates: getCoords(coordsFinal, b)},
            properties: {post: coordsFinal[b]['post'], region: coordsFinal[b]['region']}
        }));
        return points2;
    }
    // console.log(marker);
    // console.log(points);

    // console.log(i);
    const clusterer = new YMapClusterer({
        method: clusterByGrid({gridSize: 128}),
        //features: getRandomPoints(100, BOUNDS),
        //features: getPoints(coords, i = 0),
        features: points,
        marker,
        cluster
    });
    //const l1 = new YMapLayer({source: 'clusterer-source', type: 'markers', zIndex: 1800});
    //map.addChild(l1);
    map.addChild(clusterer);
    console.log(clusterer);
    //map.removeChild(clusterer[2]);
    // const l2 = new YMapLayer({source: 'clusterer-source', type: 'markers', zIndex: 1800});
    //  map.addChild(l2);
    //coords = [];
    //coords = getAllMarkers('North');
    //map.addChild(clusterer);
    //map.removeChild(l2);
    function getUpdateElementOnDetuch()
    {
        // console.log(coordsE);
        coordsFinal = [];
        var checkboxE= document.getElementById('Engineer');
        var checkboxA= document.getElementById('Agent');
        var checkboxI= document.getElementById('Installer');
        var checkboxS= document.getElementById('South');
        var checkboxN= document.getElementById('North');
        //console.log(checkboxE.checked); console.log(checkboxA.checked); console.log(checkboxI.checked); console.log(checkboxS.checked); console.log(checkboxN.checked);
        //console.log(coordsFinal);
        let filterPost = 0;
        let filterRegIndex = 0;
        let filterReg = [];
        objFilters = {};
        let filters = [];
        //coordsFinal = coordsFinal.concat(coordsS);
        //coordsFinal = coordsFinal.concat(coordsN);
        if (checkboxE.checked === true)
        {
            coordsFinal = coordsFinal.concat(coordsE);
            objFilters =
                {
                    type: "post",
                    name: "Engineer"
                }
            filterPost = 1;
            //filterPost.push(objFilters);
            filters.push(objFilters);
        }
        if (checkboxA.checked === true)
        {
            coordsFinal = coordsFinal.concat(coordsA);
            objFilters =
                {
                    type: "post",
                    name: "Agent"
                }
            filterPost = 1;
            //filterPost.push(objFilters);
            filters.push(objFilters);

        }
        if (checkboxI.checked === true)
        {
            coordsFinal = coordsFinal.concat(coordsI);
            objFilters =
                {
                    type: "post",
                    name: "Installer"
                }
            filterPost = 1;
            //filterPost.push(objFilters);
            filters.push(objFilters);
        }
        if (checkboxS.checked === true)
        {
            coordsFinal = coordsFinal.concat(coordsS);
            filterRegIndex = 1;
            //filters.push(objFilters);
            //console.log(filters);
        }
        if (checkboxN.checked === true)
        {
            coordsFinal = coordsFinal.concat(coordsN);
            filterRegIndex = 1;
            //filterReg.push(objFilters);
            //filters.push(objFilters);
        }
        if (filterPost === 1)
        {
            coordsFinal = coordsFinal.filter(filterMark => filters.some(filter => filterMark[filter.type] === filter.name));
            //console.log(coordsFinal);
        }
        /*else
        {
            if (checkboxN.checked === true)
            {
                coordsFinal = coordsFinal.concat(coordsN);
            }
            if (checkboxS.checked === true)
            {
                coordsFinal = coordsFinal.concat(coordsS);
            }
        }*/

        //console.log(coordsFinal);
        if (filterRegIndex === 1)
        {
            if (checkboxS.checked === true)
                {
                    objFilters =
                        {
                            type: "region",
                            name: "South"
                        }
                    filterReg.push(objFilters);
                }
                if (checkboxN.checked === true)
                {
                    objFilters =
                        {
                            type: "region",
                            name: "North"
                        }
                }
                filterReg.push(objFilters);
                coordsFinal = coordsFinal.filter(filterMark => filterReg.some(filter => filterMark[filter.type] === filter.name));
        }

        coordsFinal = coordsFinal.filter(Boolean);
        coordsFinal = coordsFinal.filter((item, index) => {return coordsFinal.indexOf(item) === index});
        console.log(coordsFinal);
        clusterer.update({features: getPoints2(coordsFinal)});
    }
    function changedPoints() {
        clusterer.update({features: getRandomPoints(pointsCount.value || rndNum(), map.bounds)});
    }
    function updatedPoints() {
        clusterer.update({features: points});
        document.getElementById("North").checked = false;
        document.getElementById("South").checked = false;
        document.getElementById("Installer").checked = false;
        document.getElementById("Engineer").checked = false;
        document.getElementById("Agent").checked = false;
        // $('.checkselect').checkselect();
    }

    function toggleClusterer() {
        if (clusterer.parent) {
            map.removeChild(clusterer);
        } else {
            map.addChild(clusterer);
        }
    }

    function checkNorth()
    {
        getUpdateElementOnDetuch()
    }
    function checkSouth()
    {
        getUpdateElementOnDetuch()
    }
    function checkAgent()
    {
        getUpdateElementOnDetuch()
    }
    function checkEngineer()
    {
        getUpdateElementOnDetuch()
    }
    function checkInstaller()
    {
        getUpdateElementOnDetuch()
    }

    changePoints.onclick = changedPoints;
    changeClusterer.onclick = toggleClusterer;
    updatePoints.onclick = updatedPoints;
    North.onclick = checkNorth;
    South.onclick = checkSouth;
    Agent.onclick = checkAgent;
    Engineer.onclick = checkEngineer;
    Installer.onclick = checkInstaller;


    const clickCallback = function(pinus)
    {
        if (pinus?.entity)
        {
            let p = pinus['entity']
            //let p2 = pinus['element'];
            let p2 = p['element'];
            //p2.remove();
            // console.log(p['element']);
            //console.log(p['properties']);
            console.log(p['coordinates']);
            console.log(p['element']);
            // alert('Hi');
        }
    }


    const clickRightCallback = function(pinus2)
    {
        if (!pinus2)
        {

            // Display the coordinates in the console
            //let p2 = pinus2.push(event.coordinates);
            console.log(pinus2);
            //let p2 = ;
            //let p2 = pinus['element'];
            //let coordes = e.get('coords');
            // console.log(p['element']);
            //console.log(updateHandler());
            //console.log(p2['coordinates']);
            //console.log(pinus2['longitude']);
            // alert('Hi');
        }
    }

    const clickRightCallbackTest = function (p3)
    {
        //console.log(mapListener['_props']);
        console.log(mapListener);
    }

    /*  const updateHandler = ({type, camera, location}) => {
          console.log(type, camera.tilt);

          console.log(location.zoom, location.center);
      };*/

    const mapListener = new YMapListener({
        layer: 'any',
        //MapEventHandler: updateHandler,
        onClick: clickCallback,
        onContextMenu: clickRightCallbackTest
    });
    map.addChild(mapListener);
    map.addChild(
        new YMapControls({position: 'left'})
            .addChild(new YMapGeolocationControl({}))
    );
    map.addChild(
        new YMapControls({position: 'right'})
            .addChild(new YMapZoomControl({}))
    );

    map.addChild(
        new YMapControls({position: 'bottom'})
            .addChild(new YMapZoomControl({}))
    );
}

(function($) {
    function setChecked(target) {
        var checked = $(target).find("input[type='checkbox']:checked").length;
        if (checked) {
            $(target).find('select option:first').html('Выбрано: ' + checked);
        } else {
            $(target).find('select option:first').html('Выберите из списка');
        }
    }

    $.fn.checkselect = function() {
        this.wrapInner('<div class="checkselect-popup"></div>');
        this.prepend(
            '<div class="checkselect-control">' +
            '<select class="form-control"><option></option></select>' +
            '<div class="checkselect-over"></div>' +
            '</div>'
        );

        this.each(function(){
            setChecked(this);
        });
        this.find('input[type="checkbox"]').click(function(){
            setChecked($(this).parents('.checkselect'));
        });

        this.parent().find('.checkselect-control').on('click', function(){
            $popup = $(this).next();
            $('.checkselect-popup').not($popup).css('display', 'none');
            if ($popup.is(':hidden')) {
                $popup.css('display', 'block');
                $(this).find('select').focus();
            } else {
                $popup.css('display', 'none');
            }
        });

        $('html, body').on('click', function(e){
            if ($(e.target).closest('.checkselect').length == 0){
                $('.checkselect-popup').css('display', 'none');
            }
        });
    };
})(jQuery);

$('.checkselect').checkselect();

