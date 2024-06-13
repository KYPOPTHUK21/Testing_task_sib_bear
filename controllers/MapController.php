<?php
namespace app\controllers;

use app\models\ContactForm;
use app\models\Markers;
use app\models\CreateMark;
use Yii;
use yii\web\Controller;

class MapController extends Controller
    {
        public function actionCreatemark()
        {
            //$session = Yii::$app->session;
            //$session->open();

            $model = new CreateMark();
            if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            //if ($model->load(Yii::$app->request->post())) {
                /*$model->name = $name;
                $model->coordsx = $coordsx;
                $model->coordsy = $coordsy;
                $model->region = $region;
                $model->post = $post;
                $model->save();*/
                /*$model->name;
                $model->coordsx;
                $model->coordsy;
                $model->region;
                $model->post;*/
                $Markers = new Markers();
                $name = $model->name;
                $coordsy = $model->coordsy;
                $coordsx = $model->coordsx;
                $region = $model->region;
                $post = $model->post;
                $Markers->name = $name;
                $Markers->coordsx = $coordsx;
                $Markers->coordsy = $coordsy;
                $Markers->region = $region;
                $Markers->post = $post;
                $Markers->save();
                return $this->render('success', ['model' => $model]);
            }
            return $this->render('createmark1', compact('model'));
            //return $this->render('createmark1', ['model' => $model]);
        }
        public function actionMap()
            {
                $Markers = new Markers();
                $Markers = $Markers->getAllMarkers();
                return $this->render('map1', compact('Markers'));
            }
            public function actionCreate()  //создание записей
            {
                $bounds = [
                    [55.24743610796297,35.90992654894065],
                    [56.274124335714916,39.359633580190646]
                ];
                $array_region = array("North", "South");
                $array_post = array("Installer", "Engineer", "Agent");
                $M = 'M';
                $i = 0;
                function random() {
                    return (float)rand()/(float)getrandmax();
                };
                set_time_limit(500);
                while ($i < 40000)
                {
                    $i++;
                    $Markers = new Markers();
                    $name = $M . $i;
                    $coordsx = $bounds[0][0] + ($bounds[1][0] - $bounds[0][0]) * random();
                    $coordsy = $bounds[1][1] + ($bounds[0][1] - $bounds[1][1]) * random();
                    $rand_keys_region = array_rand($array_region);
                    $rand_keys_post = array_rand($array_post);
                    $region = $array_region[$rand_keys_region];
                    $post = $array_post[$rand_keys_post];
                    //if ($Markers->load(Yii::$app->request->post())) {
                    $Markers->name = $name;
                    $Markers->coordsx = $coordsx;
                    $Markers->coordsy = $coordsy;
                    $Markers->region = $region;
                    $Markers->post = $post;
                    $Markers->save();
                    //echo $i;
                    return $this->render('create');
                }

                echo $i;

            }
    }