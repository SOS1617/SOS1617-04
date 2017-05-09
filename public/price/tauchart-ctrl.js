angular.module("ManagerApp")
    .controller("TauchartsCtrlPrice", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "?apikey=12345"
        console.log("TauchartsCtrl");

        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            $http
                .get("api/v2/price-stats" + $scope.apikey)
                .then(function(response) {
                        $scope.sta = response.data;
                         var chart = new tauCharts.Chart({
                            type: 'scatterplot',
                            x: 'priceaceite',
                            y: 'priceextra',
                            color: 'Prices',
                            data: $scope.sta,
                            plugins: [
                                tauCharts.api.plugins.get('tooltip')({
                                    fields: ["province", "year"]
                                }),
                                tauCharts.api.plugins.get('legend')()
                            ]
                        });
                        chart.renderTo('#scatter');

                     

                    },
                    function(response) {
                        $scope.sta = [];
                    });






        }

    }]);
