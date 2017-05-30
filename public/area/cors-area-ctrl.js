angular.module("ManagerApp")
    .controller("CorsAreaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("CorsAreaCtrl");

        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            var dataSV = [];
            var electionS = [];


            $http
                .get("https://sos1617-05.herokuapp.com/api/v1/elections-voting-stats?apikey=cinco")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        if ($scope.sta[i].year === "2016") {
                            if ($scope.sta[i].province === "Sevilla") {
                                electionS.push(parseInt($scope.sta[i].podemos));

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
                                    type: 'area'
                                },
                                title: {
                                    text: 'Integration with G05 election voting stats'
                                },
                                subtitle: {
                                    text: ''
                                },
                                xAxis: {
                                    categories: ['Jaen', 'Cordoba', 'Sevilla', 'Huelva', 'Cadiz', 'Malaga', 'Granada','Almeria','El-votes'],
                                    tickmarkPlacement: 'on',
                                    title: {
                                        enabled: false
                                    }
                                },
                                yAxis: {
                                    title: {
                                        text: 'Stats'
                                    },
                                    labels: {
                                        formatter: function() {
                                            return this.value / 100;
                                        }
                                    }
                                },
                                tooltip: {
                                    split: true,
                                    valueSuffix: ' Stats'
                                },
                                plotOptions: {
                                    area: {
                                        stacking: 'normal',
                                        lineColor: '#666666',
                                        lineWidth: 1,
                                        marker: {
                                            lineWidth: 1,
                                            lineColor: '#666666'
                                        }
                                    }
                                },
                                series: [{
                                    name: 'Area',
                                    data: [dataJ, dataCo, dataS, dataH, dataCa, dataM, dataG, dataA]
                                }, {
                                    name: 'Votes',
                                    data: [dataSV, dataSV, dataSV, dataSV, dataSV, dataSV, dataSV, dataSV, electionS]
                                }]
                            });





                        });



                });




        }

    }]);
