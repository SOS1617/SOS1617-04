angular.module("ManagerApp")
    .controller("HighProxyAreaCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("ProxyCtrl");
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
            .get("proxyAdrian")
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
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: true,
                        type: 'pie'
                    },
                    title: {
                        text: 'Highcharts Pie Area'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
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
