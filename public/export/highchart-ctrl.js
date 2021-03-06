angular.module("ManagerApp")
    .controller("HighExportCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
            console.log("HighExportCtrl");
            var categoriesH = [];
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];

            $scope.sta = [];

            function sortResults(prop, asc) {
                $scope.sta = $scope.sta.sort(function(a, b) {
                    if (asc) {
                        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                    }
                    else {
                        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                    }
                });
            }


                $http
                    .get("api/v3/export-and-import")
                    .then(function(response) {
                        $scope.sta = response.data;
                        sortResults('year', true);
                        var cat = [];
                        for (var i in $scope.sta) {
                            cat.push($scope.sta[i].year);
                            switch ($scope.sta[i].province) {
                                case "sevilla":
                                    dataS.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "malaga":
                                    dataM.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "cadiz":
                                    dataCa.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "granada":
                                    dataG.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "cordoba":
                                    dataCo.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "almeria":
                                    dataA.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "jaen":
                                    dataJ.push(parseInt($scope.sta[i].oil));
                                    break;
                                case "huelva":
                                    dataH.push(parseInt($scope.sta[i].oil));
                                    break;
                            }
                        }
                        cat.sort();
                        categoriesH = cat.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });
                        Highcharts.chart('container', {
                            chart: {
                                type: 'area'
                            },
                            title: {
                                text: 'Tons of oil in Andalucia'
                            },
                            subtitle: {
                                text: 'Source: Junta de Andalucia'
                            },
                            xAxis: {
                                categories: categoriesH,
                                tickmarkPlacement: 'on',
                                title: {
                                    enabled: false
                                }
                            },
                            yAxis: {
                                title: {
                                    text: 'Tons'
                                },
                                labels: {
                                    formatter: function() {
                                        return this.value / 1000;
                                    }
                                }
                            },
                            tooltip: {
                                split: true,
                                valueSuffix: ' tons'
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
                                name: 'sevilla',
                                data: dataS
                            }, {
                                name: 'malaga',
                                data: dataM
                            }, {
                                name: 'cadiz',
                                data: dataCa
                            }, {
                                name: 'granada',
                                data: dataG
                            }, {
                                name: 'cordoba',
                                data: dataCo
                            }, {
                                name: 'almeria',
                                data: dataA
                            }, {
                                name: 'jaen',
                                data: dataJ
                            }, {
                                name: 'huelva',
                                data: dataH
                            }]
                        });

                    }, function(response) {
                        $scope.sta = [];
                    });
            }]);
