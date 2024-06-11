<?php
namespace app\models;
use yii\db\ActiveRecord;
use app\models\Markers;
use Yii;
class Markers extends ActiveRecord
    {
        public static function tableName()
            {
                return 'markers';
            }
        public function getAllMarkers()
            {
                $Markers = Yii::$app->cache->get('markers');
                if (!$Markers) 
                        {
                            $Markers = Markers::find()->asArray()->all();
                            Yii::$app->cache->set('markers', $Markers, 120);
                        }
                return $Markers;
            }

    }

?>