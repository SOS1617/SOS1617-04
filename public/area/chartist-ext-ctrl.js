angular.module("ManagerApp")
    .controller("ChartistExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        // Dato api propia
        var datoArea;
        $http
            .get("api/v3/area-and-production&year=2013&province=sevilla")
            .then(function(response) {
                    $scope.sta = response.data;
                    console.log(response.data);
                    for (var i in $scope.sta) {
                        datoArea = parseInt($scope.sta[i].areaS);
                    }
                },
                function(response) {
                    $scope.sta = [];
                });
        console.log(datoArea)

        $http
            .get("https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/bundesliga/seasons/15-16/topscorers")
            .then(function(response) {
                    new Chartist.Line('.ct-chart', {
                        labels: ['Sevilla', 'Soccer'],
                        series: [
                            [parseInt(datoArea)],
                            [parseInt(response.data.number)]
                            
                        ]
                    }, {
                        fullWidth: true,
                        chartPadding: {
                            right: 40
                        }
                    });

                },
                function(response) {
                    $scope.sta = [];
                });


    }]);
