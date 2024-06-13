<?php


//use yii\bootstrap5\ActiveForm;
use yii\helpers\Html;
use yii\widgets\ActiveForm;


?>
<?php $form = ActiveForm::begin(); ?>

<?= $form->field($model, 'name') ?>

<?= $form->field($model, 'coordsx') ?>
<?= $form->field($model, 'coordsy') ?>
<?= $form->field($model, 'region') ?>
<?= $form->field($model, 'post') ?>

<div class="form-group">
    <?= Html::submitButton('Отправить', ['class' => 'btn btn-primary']) ?>
</div>

<?php ActiveForm::end(); ?>
