angular.module("ManagerApp")
    .controller("HighchartsCtrlPrice2", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.data = {};
        var dataCache = {};
        $scope.categorias = [];
        $scope.rpcyear = [];
        $scope.rpcvariation = [];

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        $scope.apikey = "?apikey=12345"
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
            .get("api/v2/price-stats" + $scope.apikey + "&year=2014")
            .then(function(response) {
                        $scope.sta = response.data;
                        sortResults('year', true);
                        var cat = [];
                        for (var i in $scope.sta) {
                            cat.push($scope.sta[i].year);
                            switch ($scope.sta[i].province) {
                                case "sevilla":
                                    dataS.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "malaga":
                                    dataM.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "cadiz":
                                    dataCa.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "granada":
                                    dataG.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "cordoba":
                                    dataCo.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "almeria":
                                    dataA.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "huelva":
                                    dataH.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                                case "sevilla":
                                    dataS.push(parseFloat($scope.sta[i].pricevirgen));
                                    break;
                            }
                        }
                        cat.sort();
                        categoriesH = cat.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });
            }, function(response) {
                $scope.sta = [];
            });
            
                        
        $http.get("https://sos1617-02.herokuapp.com/api/v1/rpc-stats" + "?" + "apikey=GVAODcH3").then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;

            for (var i = 0; i < response.data.length; i++) {
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].country));
                $scope.rpcyear.push(Number($scope.data[i]["rpc-year"]));
                $scope.rpcvariation.push(Number($scope.data[i]["rpc-variation"]));
            }
        });
        
        $http.get("proxyLuis").then(function(response) {
            //RPC en 2014 y precio del aceite de oliva en sevilla en 2014
            var cat = $scope.categorias;
            cat.push(categoriesH[0]);
            cat.push([1,2,3]);
            var dataAceite = [null, null];
            dataAceite.push(dataS[0]);
            
            Highcharts.chart('container', 
                // Datos api compañero
                {
                title: {
                    text: 'WORLD RPC 2014'
                },
                chart: {
                    type: 'bar',
                    inverted: false
                },
                xAxis: {
                    categories: cat
                },
                yAxis: {
                    title: {
                        countries: $scope.rpcyear
                    }
                },
                tooltip: {
                    valueSuffix: '€'
                },

                plotOptions: {
                    columnrange: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return this.y + '°€';
                            }
                        }
                    }
                },

                legend: {
                    enabled: false
                },

                series: [{
                    name: 'RPC Year',
                    data: $scope.rpcyear
                },{
                    name: 'Precio aceite',
                    data: dataAceite
                }
                /*{
                    name: 'sevilla',
                    //type: 'line',
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
                }*/]
            });


        });
        
    }]);