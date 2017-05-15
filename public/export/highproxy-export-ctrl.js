angular.module("ManagerApp")
    .controller("HighProxyExportCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
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
            .get("proxyAlberto")
            .then(function(response) {
                $scope.sta = response.data;
                console.log($scope.sta);
                sortResults('year', true);
                var cat = [];
                for (var i in $scope.sta) {
                    cat.push($scope.sta[i].year);
                    switch ($scope.sta[i].province) {
                        case "Sevilla":
                            dataS.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Malaga":
                            dataM.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Cadiz":
                            dataCa.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Granada":
                            dataG.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Cordoba":
                            dataCo.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Almeria":
                            dataA.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Jaen":
                            dataJ.push(parseInt($scope.sta[i].gdp));
                            break;
                        case "Huelva":
                            dataH.push(parseInt($scope.sta[i].gdp));
                            break;
                    }
                }
                cat.sort();
                categoriesH = cat.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                console.log(categoriesH);


                Highcharts.chart('container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Stacked bar chart'
                    },
                    xAxis: {
                        categories: categoriesH
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
