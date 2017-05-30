angular.module("ManagerApp")
    .controller("ChartistExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("ChartistExtCtrl");
        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var ExtA = [];
            //var ExtB = [];



            //api externa
            $http
                .get("https://irythia-hs.p.mashape.com/cards")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        ExtA.push(parseInt($scope.sta[i].cost));
                        ExtA.push(parseInt($scope.sta[i].health));
                    }
                    $http
                        .get("api/v3/area-and-production")
                        .then(function(response) {
                            $scope.stat = response.data;
                            for (var i in $scope.stat) {
                                if ($scope.stat[i].year === $scope.year) {
                                    switch ($scope.stat[i].province) {
                                        case "sevilla":
                                            dataS.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "malaga":
                                            dataM.push(parseInt($scope.stat[i].areaS));
                                            break;

                                    }
                                }
                            }
                            //grafica
                            new Chartist.Line('.ct-chart', {
                                labels: ['Sevilla', 'Malaga'],
                                series: [
                                    [dataS[0], dataM[0]],
                                    [ExtA[0], ExtA[1]]
                                ]
                            }, {
                                fullWidth: true,
                                chartPadding: {
                                    right: 40
                                }
                            });

                        });


                });

            console.log(dataS);
            console.log(ExtA);

        }

    }]);
