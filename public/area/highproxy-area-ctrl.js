angular.module("ManagerApp")
    .controller("HighProxyAreaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

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
            var mathS = [];
            var mathB = [];
            var mathSw = [];
            var mathP = [];
            var mathUk = [];
            var mathF = [];
            var mathFr = [];
            var mathH = [];



            $http
                .get("proxyAdrian")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        if ($scope.sta[i].year === $scope.year) {
                            switch ($scope.sta[i].country) {
                                case "Spain":
                                    mathS.push(parseInt($scope.sta[i].math));
                                    break;
                                case "Belgium":
                                    mathB.push(parseInt($scope.sta[i].math));
                                    break;
                                case "Switzerland":
                                    mathSw.push(parseInt($scope.sta[i].math));
                                    break;
                                case "Poland":
                                    mathP.push(parseInt($scope.sta[i].math));
                                    break;
                                case "United Kingdom":
                                    mathUk.push(parseInt($scope.sta[i].math));
                                    break;
                                case "Finland":
                                    mathF.push(parseInt($scope.sta[i].math));
                                    break;
                                case "Holland":
                                    mathH.push(parseInt($scope.sta[i].math));
                                    break;
                                case "France":
                                    mathFr.push(parseInt($scope.sta[i].math));
                                    break;
                            }
                        }
                    }

                    $http
                        .get("api/v3/area-and-production")
                        .then(function(response) {
                            $scope.stat = response.data;
                            for (var i in $scope.stat) {
                                if ($scope.stat[i].year === $scope.year) {
                                    switch ($scope.stat[i].province) {
                                        case "sevilla":
                                            dataS.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "malaga":
                                            dataM.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "cadiz":
                                            dataCa.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "granada":
                                            dataG.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "cordoba":
                                            dataCo.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "almeria":
                                            dataA.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "jaen":
                                            dataJ.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "huelva":
                                            dataH.push(parseInt($scope.stat[i].areaS));
                                            break;
                                    }
                                }
                            }
                            Highcharts.chart('container', {
                                chart: {
                                    type: 'bar'
                                },
                                title: {
                                    text: 'Integration with G03 results api'
                                },
                                subtitle: {
                                    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                                },
                                xAxis: {
                                    categories: ['Jaen', 'Cordoba', 'Sevilla', 'Huelva', 'Cadiz','Malaga','Granada','Almeria'],
                                    title: {
                                        text: null
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: '',
                                        align: 'high'
                                    },
                                    labels: {
                                        overflow: 'justify'
                                    }
                                },
                                tooltip: {
                                    valueSuffix: ' millions'
                                },
                                plotOptions: {
                                    bar: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'top',
                                    x: -40,
                                    y: 80,
                                    floating: true,
                                    borderWidth: 1,
                                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                    shadow: true
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [{
                                    name: 'Area',
                                    data: [dataS, dataM, dataCa, dataM, dataG, dataCo, dataA, dataJ, dataH]
                                }, {
                                    name: 'Result',
                                    data: [mathS, mathB, mathSw, mathP, mathUk, mathF, mathH, mathF, dataH]
                                }]
                            });



                        });



                });

            console.log(dataS);
            console.log(mathS);



        }

    }]);
