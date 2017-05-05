angular.module("ManagerApp")
    .controller("TauchartsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

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
                .get("api/v2/export-and-import" + $scope.apikey)
                .then(function(response) {
                        $scope.sta = response.data;
                         var chart = new tauCharts.Chart({
                            type: 'scatterplot',
                            x: 'importS',
                            y: 'exportS',
                            color: 'provinces',
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
