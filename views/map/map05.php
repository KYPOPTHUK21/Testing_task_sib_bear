<?php
echo "<pre>";
var_dump($Markers);
echo "</pre>";
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Карта</title>
<script src="https://api-maps.yandex.ru/v3/?apikey=f931a4e0-077e-409e-948c-2e5fad8a405b&lang=ru_RU"></script>
    <script src="https://yandex.st/jquery/2.2.3/jquery.min.js" type="text/javascript"></script>
</head>
<body>
<style> html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; } .toolbar { position: absolute; z-index: 1000; top: 0; left: 0; display: flex; align-items: center; padding: 16px; } .toolbar a { padding: 16px; }  </style>
<div id="map" style="width: 1600px; height: 1400px"></div>

<script type="text/javascript">

initMap();

async function initMap() {
    await ymaps3.ready;

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapControls,
        YMapControlButton
    } = ymaps3;
    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),
        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.588144, 55.733842],
                // Уровень масштабирования
                zoom: 10
            }
        }
    );
    map.addChild(new YMapDefaultSchemeLayer());

   /* const {YMapGeolocationControl, YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const controls = new YMapControls({position: 'top left', orientation: 'vertical'});
    controls.addChild(new YMapGeolocationControl({}));
    controls.addChild(new YMapZoomControl({}));
    map.addChild(controls);*/
}


</script>

</body>
</html>