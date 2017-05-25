angular.module("ManagerApp")
    .controller("HighchartsCtrlPrice1", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.data = {};
        var dataCache = {};
        $scope.country = [];
        $scope.year = [];
        $scope.gdp = [];
        $scope.gdp_growth = [];
        $scope.gdp_deflator = [];

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
            .get("api/v3/price-stats" + $scope.apikey + "&year=2014")
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
                            }
                        }
                        cat.sort();
                        categoriesH = cat.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });
            }, function(response) {
                $scope.sta = [];
            });


        $http.get("https://sos1617-06.herokuapp.com/api/v1/gdp" + "?" + "apikey=secret").then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;

            for (var i = 0; i < response.data.length; i++) {
                $scope.country.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.year.push(Number($scope.data[i].year));
                $scope.gdp.push(Number($scope.data[i].gdp));
                $scope.gdp_growth.push(Number($scope.data[i].gdp_growth));
                $scope.gdp_deflator.push(Number($scope.data[i].gdp_deflator));
            }
            
            //Datos api y precio del aceite de oliva en sevilla en 2014
            var cats = $scope.country; // categorias
            cats.push("Sevilla 2014 precio aceite");
            dataS.unshift(null, null, null, null);
            console.log(dataS);
            Highcharts.chart('container', {
                title: {
                    text: 'Highcharts'
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: cats
                },
                legend: {
                    layout: 'vertical',
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    //align: 'left',
                    verticalAlign: 'top',
                    align: 'right',
                    y: 60,
                    x: -60
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.series.name + '</b><br/>' +
                            capitalizeFirstLetter(this.x) + ': ' + this.y;
                    }
                },
                series: [ {
                    name: 'Gdp',
                    data: $scope.gdp
                },{
                    name: 'Precio aceite sevilla 2014',
                    data: dataS
                }]
            });
        });
    }]);