<?php
use yii\helpers\Html;
?>
<h1>Маркер успешно добавлен</h1>
<p>Вы ввели следующую информацию:</p>

<ul>
    <li><label>Name</label>: <?= Html::encode($model->name) ?></li>
    <li><label>Coordsx</label>: <?= Html::encode($model->coordsx) ?></li>
    <li><label>Coordsy</label>: <?= Html::encode($model->coordsy) ?></li>
    <li><label>Region</label>: <?= Html::encode($model->region) ?></li>
    <li><label>Post</label>: <?= Html::encode($model->post) ?></li>

    <?php
    /*$model->name;
    $model->coordsx;
    $model->coordsy;
    $model->region;
    $model->post;
    $model->save()*/
    //$model->save();
    ?>
</ul>