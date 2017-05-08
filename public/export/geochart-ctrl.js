angular.module("ManagerApp")
    .controller("GeochartsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "?apikey=12345"
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
                .get("api/v2/export-and-import" + $scope.apikey)
                .then(function(response) {
                        $scope.sta = response.data;
                        for (var i in $scope.sta) {
                            if ($scope.sta[i].year === $scope.year) {
                                switch ($scope.sta[i].province) {
                                    case "sevilla":
                                        dataS.push("sevilla");
                                        dataS.push(parseInt($scope.sta[i].importS));
                                        dataS.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "malaga":
                                        dataM.push("malaga");
                                        dataM.push(parseInt($scope.sta[i].importS));
                                        dataM.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "cadiz":
                                        dataCa.push("cadiz");
                                        dataCa.push(parseInt($scope.sta[i].importS));
                                        dataCa.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "granada":
                                        dataG.push("granada");
                                        dataG.push(parseInt($scope.sta[i].importS));
                                        dataG.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "cordoba":
                                        dataCo.push("cordoba");
                                        dataCo.push(parseInt($scope.sta[i].importS));
                                        dataCo.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "almeria":
                                        dataA.push("almeria");
                                        dataA.push(parseInt($scope.sta[i].importS));
                                        dataA.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "jaen":
                                        dataJ.push("jaen");
                                        dataJ.push(parseInt($scope.sta[i].importS));
                                        dataJ.push(parseInt($scope.sta[i].exportS));
                                        break;
                                    case "huelva":
                                        dataH.push("huelva");
                                        dataH.push(parseInt($scope.sta[i].importS));
                                        dataH.push(parseInt($scope.sta[i].exportS));
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
                                ['City', 'Import(Tons)', 'Export(Tons)'],
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
