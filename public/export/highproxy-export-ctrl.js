angular.module("ManagerApp")
    .controller("HighProxyExportCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("ProxyCtrl");




        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            var gdpS = [];
            var gdpM = [];
            var gdpCa = [];
            var gdpG = [];
            var gdpCo = [];
            var gdpA = [];
            var gdpJ = [];
            var gdpH = [];



            $http
                .get("proxyAlberto")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        if ($scope.sta[i].year === $scope.year) {
                            switch ($scope.sta[i].province) {
                                case "Sevilla":
                                    gdpS.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Malaga":
                                    gdpM.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Cadiz":
                                    gdpCa.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Granada":
                                    gdpG.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Cordoba":
                                    gdpCo.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Almeria":
                                    gdpA.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Jaen":
                                    gdpJ.push(parseInt($scope.sta[i].gdp));
                                    break;
                                case "Huelva":
                                    gdpH.push(parseInt($scope.sta[i].gdp));
                                    break;
                            }
                        }
                    }

                    $http
                        .get("api/v3/export-and-import")
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
                                    categories: ["Sevilla", "Malaga", "Cadiz", "Granada", "Cordoba", "Almeria", "Jaen", "Huelva"]
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: 'Gdp and oil in andalucia'
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
                                    data: [dataS, dataM, dataCa, dataG, dataCo, dataA, dataJ, dataH]
                                }, {
                                    name: 'gdp',
                                    data: [gdpS, gdpM, gdpCa, gdpG, gdpCo, gdpA, gdpJ, gdpH]
                                }]
                            });
                        });
                });

        }

    }]);
