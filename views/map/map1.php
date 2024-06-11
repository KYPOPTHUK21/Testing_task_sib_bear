<?php
use app\assets\AppAssetMap;
use \yii\web\View;
use yii\helpers\Url;
echo "<pre>";
//var_dump($Markers);
//echo $Markers[1]['name'];


$this->registerJs(
       "var ArrMarkers = ".\yii\helpers\Json::encode($Markers).";",
    View::POS_HEAD,
    'ArrMarkers'
);
$this->registerJs(
    "var ArrMarkersCount = ".\yii\helpers\Json::encode(Count($Markers)).";",
    View::POS_HEAD,
    'ArrMarkersCount'
);
//echo count($Markers);

//echo $data;
echo "</pre>";
AppAssetMap::register($this);
?>


<head>
    <?php $this->head() ?>


    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <script src="https://api-maps.yandex.ru/v3/?apikey=f931a4e0-077e-409e-948c-2e5fad8a405b&lang=en_US"></script>

</head>
<body>


<div class="modal fade" id="order" tabindex="-1" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            </div>
        </div>
    </div>

<div class="toolbar">
    <input id="pointsCount" value="100" placeholder="Count" />
    <button type="button" id="changePoints">Create new points</button>
    <button type="button" id="changeClusterer">Delete/Add Clusterer</button>
    <button type="button" id="updatePoints">Update points</button>


</div>
<div class="checkselect">
    <fieldset>
        <legend>Region</legend>
        <label><input  value="1" id = "North" type="checkbox"> North</label>
        <label><input  value="2" id = "South" type="checkbox"> South</label>
    </fieldset>
    <fieldset>
        <legend>Post</legend>
        <label><input  value="4" id = "Installer" type="checkbox"> Installer</label>
        <label><input  value="5" id = "Engineer" type="checkbox"> Engineer</label>
        <label><input  value="6" id = "Agent" type="checkbox"> Agent</label>
    </fieldset>
</div>
<div id="app" style="position: absolute; width:100%; height:93%; "></div>

</body>


