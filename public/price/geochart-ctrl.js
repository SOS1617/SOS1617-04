angular.module("ManagerApp")
    .controller("GeochartsCtrlPrice", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "?apikey=12345"
        console.log("GeochartsCtrlPrice");


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
                .get("api/v2/price-stats" + $scope.apikey)
                .then(function(response) {
                        $scope.sta = response.data;
                        for (var i in $scope.sta) {
                            if ($scope.sta[i].year === $scope.year) {
                                console.log($scope.sta[i]);
                                switch ($scope.sta[i].province) {
                                    case "sevilla":
                                        dataS.push("sevilla");
                                        dataS.push(parseInt($scope.sta[i].pricevirgen));
                                        dataS.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "malaga":
                                        dataM.push("malaga");
                                        dataM.push(parseInt($scope.sta[i].pricevirgen));
                                        dataM.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "cadiz":
                                        dataCa.push("cadiz");
                                        dataCa.push(parseInt($scope.sta[i].pricevirgen));
                                        dataCa.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "granada":
                                        dataG.push("granada");
                                        dataG.push(parseInt($scope.sta[i].pricevirgen));
                                        dataG.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "cordoba":
                                        dataCo.push("cordoba");
                                        dataCo.push(parseInt($scope.sta[i].pricevirgen));
                                        dataCo.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "almeria":
                                        dataA.push("almeria");
                                        dataA.push(parseInt($scope.sta[i].pricevirgen));
                                        dataA.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "jaen":
                                        dataJ.push("jaen");
                                        dataJ.push(parseInt($scope.sta[i].pricevirgen));
                                        dataJ.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                    case "huelva":
                                        dataH.push("huelva");
                                        dataH.push(parseInt($scope.sta[i].pricevirgen));
                                        dataH.push(parseInt($scope.sta[i].priceextra));
                                        break;
                                }
                            }
                        }
                        //console.log(dataH);

                        google.charts.load('current', {
                            'packages': ['geochart'],                              
                            mapsApiKey: "AIzaSyD3cwim5y4k5XplhEsTj_AuLYdu6rQHq2o"
                            
                        });
                        google.charts.setOnLoadCallback(drawMarkersMap);

                        function drawMarkersMap() {
                            var data = google.visualization.arrayToDataTable([
                                ['City', 'Price Virgen (Eur)', 'Price Extra (Eur)'],
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
