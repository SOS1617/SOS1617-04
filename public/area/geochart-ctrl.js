angular.module("ManagerApp")
    .controller("GeoAreaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("GeochartsCtrl");


        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            $http
                .get("api/v3/area-and-production" )
                .then(function(response) {
                        $scope.sta = response.data;
                        for (var i in $scope.sta) {
                            if ($scope.sta[i].year === $scope.year) {
                                switch ($scope.sta[i].province) {
                                    case "sevilla":
                                        dataS.push("sevilla");
                                        dataS.push(parseInt($scope.sta[i].areaS));
                                        dataS.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "malaga":
                                        dataM.push("malaga");
                                        dataM.push(parseInt($scope.sta[i].areaS));
                                        dataM.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "cadiz":
                                        dataCa.push("cadiz");
                                        dataCa.push(parseInt($scope.sta[i].areaS));
                                        dataCa.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "granada":
                                        dataG.push("granada");
                                        dataG.push(parseInt($scope.sta[i].areaS));
                                        dataG.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "cordoba":
                                        dataCo.push("cordoba");
                                        dataCo.push(parseInt($scope.sta[i].areaS));
                                        dataCo.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "almeria":
                                        dataA.push("almeria");
                                        dataA.push(parseInt($scope.sta[i].areaS));
                                        dataA.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "jaen":
                                        dataJ.push("jaen");
                                        dataJ.push(parseInt($scope.sta[i].areaS));
                                        dataJ.push(parseInt($scope.sta[i].productionS));
                                        break;
                                    case "huelva":
                                        dataH.push("huelva");
                                        dataH.push(parseInt($scope.sta[i].areaS));
                                        dataH.push(parseInt($scope.sta[i].productionS));
                                        break;
                                }
                            }
                        }
                        console.log(dataH);

                        google.charts.load('current', {
                            'packages': ['geochart'],
                             mapsApiKey: "AIzaSyD3cwim5y4k5XplhEsTj_AuLYdu6rQHq2o"
                        });
                        google.charts.setOnLoadCallback(drawMarkersMap);

                        function drawMarkersMap() {
                            var data = google.visualization.arrayToDataTable([
                                ['City', 'Area', 'Production(Tons)'],
                                dataS, dataM, dataCa, dataG, dataCo, dataA, dataJ, dataH
                            ]);


                            var options = {
                                region: 'ES',
                                displayMode: 'markers',
                                colorAxis: {
                                    colors: ['green', 'blue']
                                }
                            };

                            var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                            chart.draw(data, options);
                        };


                    },
                    function(response) {
                        $scope.sta = [];
                    });






        }

    }]);
