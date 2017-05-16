angular.module("ManagerApp")
    .controller("CorsExportCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("CorsExportCtrl");

        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            var dataSP = [];
            var popuS = [];


            $http
                .get("https://sos1617-03.herokuapp.com/api/v1/investmentseducation/?apikey=apisupersecreta")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        if ($scope.sta[i].year === $scope.year) {
                            if ($scope.sta[i].country==="spain") {
                                    popuS.push(parseInt($scope.sta[i].population));
                                    
                            }
                        }
                    }

                    $http
                        .get("api/v2/export-and-import?apikey=12345")
                        .then(function(response) {
                            $scope.stat = response.data;
                            for (var i in $scope.stat) {
                                if ($scope.stat[i].year === $scope.year) {
                                    switch ($scope.stat[i].province) {
                                        case "sevilla":
                                            dataS.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "malaga":
                                            dataM.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "cadiz":
                                            dataCa.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "granada":
                                            dataG.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "cordoba":
                                            dataCo.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "almeria":
                                            dataA.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "jaen":
                                            dataJ.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "huelva":
                                            dataH.push(parseInt($scope.stat[i].oil));
                                            break;
                                    }
                                }
                            }
                            Highcharts.chart('container', {
                                chart: {
                                    type: 'bar'
                                },
                                title: {
                                    text: 'Stacked bar chart'
                                },
                                xAxis: {
                                    categories: ["Sevilla", "Malaga", "Cadiz", "Granada", "Cordoba", "Almeria", "Jaen", "Huelva",
                                        "Spain" ]
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Total fruit consumption'
                                    }
                                },
                                legend: {
                                    reversed: true
                                },
                                plotOptions: {
                                    series: {
                                        stacking: 'normal'
                                    }
                                },
                                series: [{
                                    name: 'oil',
                                    data: [dataS, dataM, dataCa, dataG, dataCo, dataA, dataJ, dataH,dataSP]
                                }, {
                                    name: 'population',
                                    data: [dataSP, dataSP, dataSP, dataSP, dataSP, dataSP, dataSP,dataSP, popuS]
                                }]
                            });





                        });



                });




        }

    }]);
