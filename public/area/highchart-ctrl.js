angular.module("ManagerApp")
    .controller("HighAreaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("HighAreaCtrl");
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
            .get("api/v3/area-and-production")
            .then(function(response) {
                $scope.sta = response.data;
                var cat = [];
                for (var i in $scope.sta) {
                    cat.push($scope.sta[i].year);
                    switch ($scope.sta[i].province) {
                        case "sevilla":
                            dataS.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "malaga":
                            dataM.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "cadiz":
                            dataCa.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "granada":
                            dataG.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "cordoba":
                            dataCo.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "almeria":
                            dataA.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "huelva":
                            dataH.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "sevilla":
                            dataS.push(parseInt($scope.sta[i].areaS));
                            break;
                    }
                }
                cat.sort();
                categoriesH = cat.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                Highcharts.chart('container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Stacked bar chart'
                    },
                    subtitle: {
                        text: 'Source: Junta de Andalucia'
                    },
                    xAxis: {
                        categories: categoriesH,
                    },
                    yAxis: {
                        min: 0,
                            title: {
                            text: 'Area of oil in Andalucia'
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
