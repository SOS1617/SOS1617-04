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
        var dataS = [];
        $scope.sta = [];

        $http
            .get("api/v2/price-stats" + $scope.apikey + "&year=2014&province=sevilla")
            .then(function(response) {
                $scope.sta = response.data;
                for (var i in $scope.sta) {
                    switch ($scope.sta[i].province) {
                        case "sevilla":
                            dataS.push(parseFloat($scope.sta[i].pricevirgen));
                            break;
                    }
                }
            }, function(response) {
                $scope.sta = [];
            });


        $http.get("proxyLuis").then(function(response) {
            //RPC en 2014 y precio del aceite de oliva en sevilla en 2014
            var cat = ['RPC venezuela 2016', 'Price virgen extra 2014 sevilla'];
            var data = [parseFloat(response.data.rpcyear), dataS[0]];

            Highcharts.chart('container', {
                title: {
                    text: 'Comparativa rpc vs aceite'
                },
                chart: {
                    type: 'bar',
                    inverted: false
                },
                xAxis: {
                    categories: cat
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'RPC Year',
                    data: data
                }]
            });

        });

    }]);