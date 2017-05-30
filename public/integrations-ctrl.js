angular.module("ManagerApp")
    .controller("IntegrationsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("IntegrationsCtrl");

        $scope.change = function() {
            var priceS = [];
            var priceM = [];
            var priceCa = [];
            var priceG = [];
            var priceCo = [];
            var priceA = [];
            var priceJ = [];
            var priceH = [];

            var oilS = [];
            var oilM = [];
            var oilCa = [];
            var oilG = [];
            var oilCo = [];
            var oilA = [];
            var oilJ = [];
            var oilH = [];

            var areaS = [];
            var areaM = [];
            var areaCa = [];
            var areaG = [];
            var areaCo = [];
            var areaA = [];
            var areaJ = [];
            var areaH = [];

            $http
                .get("api/v3/price-stats")
                .then(function(response) {
                    $scope.sta = response.data;

                    for (var i in $scope.sta) {
                        if ($scope.sta[i].year === $scope.year) {

                            switch ($scope.sta[i].province) {
                                case "sevilla":
                                    priceS.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "malaga":
                                    priceM.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "cadiz":
                                    priceCa.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "granada":
                                    priceG.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "cordoba":
                                    priceCo.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "almeria":
                                    priceA.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "jaen":
                                    priceJ.push(parseInt($scope.sta[i].priceaceite));
                                    break;
                                case "huelva":
                                    priceH.push(parseInt($scope.sta[i].priceaceite));
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
                                            oilS.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "malaga":
                                            oilM.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "cadiz":
                                            oilCa.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "granada":
                                            oilG.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "cordoba":
                                            oilCo.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "almeria":
                                            oilA.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "jaen":
                                            oilJ.push(parseInt($scope.stat[i].oil));
                                            break;
                                        case "huelva":
                                            oilH.push(parseInt($scope.stat[i].oil));
                                            break;
                                    }
                                }
                            }
                            $http
                                .get("api/v3/area-and-production")
                                .then(function(response) {
                                    $scope.stats = response.data;
                                    for (var i in $scope.stats) {
                                        if ($scope.stats[i].year === $scope.year) {
                                            switch ($scope.stats[i].province) {
                                                case "sevilla":
                                                    areaS.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "malaga":
                                                    areaM.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "cadiz":
                                                    areaCa.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "granada":
                                                    areaG.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "cordoba":
                                                    areaCo.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "almeria":
                                                    areaA.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "jaen":
                                                    areaJ.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                                case "huelva":
                                                    areaH.push(parseInt($scope.stats[i].areaS));
                                                    break;
                                            }
                                        }
                                    }
                                    Highcharts.chart('container', {
                                        chart: {
                                            type: 'column'
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
                                                text: 'Population and oil in Spain'
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
                                            name: 'price aceite',
                                            data: [priceS, priceM, priceCa, priceG, priceCo, priceA, priceJ, priceH]
                                        }, {
                                            name: 'oil',
                                            data: [oilS, oilM, oilCa, oilG, oilCo, oilA, oilJ, oilH]
                                        }, {
                                            name: 'area',
                                            data: [areaS, areaM, areaCa, areaG, areaCo, areaA, areaJ, areaH]
                                        }]
                                    });





                                });



                        });

                });



        }

    }]);
