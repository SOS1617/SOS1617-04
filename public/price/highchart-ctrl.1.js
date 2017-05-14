angular.module("ManagerApp")
    .controller("HighchartsCtrlPrice1", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.apikey = "secret";
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

        $http.get("https://sos1617-06.herokuapp.com/api/v1/gdp" + "?" + "apikey=" + $scope.apikey).then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;

            for (var i = 0; i < response.data.length; i++) {
                $scope.country.push(capitalizeFirstLetter($scope.data[i].country) + " " + $scope.data[i].year);
                $scope.year.push(Number($scope.data[i].year));
                $scope.gdp.push(Number($scope.data[i].gdp));
                $scope.gdp_growth.push(Number($scope.data[i].gdp_growth));
                $scope.gdp_deflator.push(Number($scope.data[i].gdp_deflator));

                console.log($scope.data[i].country);
            }


            Highcharts.chart('container', {
                title: {
                    text: 'Highcharts'
                },
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: $scope.country
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
                series: [{
                    name: 'Country',
                    data: $scope.country
                }, {
                    name: 'Year',
                    data: $scope.year
                }, {
                    name: 'Gdp',
                    data: $scope.gdp
                }, {
                    name: 'Gdp_Growth',
                    data: $scope.gdp_growth
                }, {
                    name: 'Gdp_Deflator',
                    data: $scope.gdp_deflator
                }]
            });
        });
    }]);