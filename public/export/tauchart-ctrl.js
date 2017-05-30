angular.module("ManagerApp")
    .controller("TauchartsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("TauchartsCtrl");

        $scope.change = function() {
    
            $http
                .get("api/v3/export-and-import")
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
