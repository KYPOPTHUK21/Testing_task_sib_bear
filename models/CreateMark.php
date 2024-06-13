<?php

namespace app\models;
use Yii;
use yii\db\ActiveRecord;
use app\models\Markers;


class CreateMark extends ActiveRecord
{
    public $name;
    public $coordsx;
    public $coordsy;
    public $region;
    public $post;
    public static function tableName()
    {
        return 'markers';
    }
    public function rules()
    {
        return
        [
            [['name', 'coordsx', 'coordsy', 'region', 'post'], 'required'],
            [['name'], 'string', 'max' => 255],

        ];

    }
    public function attributeLabels()
    {
        return
        [
            'name' => 'Name',
            'coordsx' => 'Coordsx',
            'coordsy' => 'Coordsy',
            'region' => 'Region',
            'post' => 'Post',
        ];
    }
}