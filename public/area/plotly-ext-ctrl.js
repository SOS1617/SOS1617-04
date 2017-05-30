angular.module("ManagerApp")
    .controller("PlotlyExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("PlotlyExtCtrl");
        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var ExtA = [];
            var ExtB = [];
            



            $http
                .get("https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {
                        if ($scope.sta[i].league_slug === $scope.league_slug) {
                            switch ($scope.sta[i].league_slug) {
                                case "bundesliga":
                                    ExtA.push(parseInt($scope.sta[i].level));
                                    break;
                                case "serie-b":
                                    ExtB.push(parseInt($scope.sta[i].level));
                                    break;
                            }
                        }
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
                            var trace1 = {
                            x: ['sevilla', 'malaga'],
                            y: [dataS[0],dataM[0]],
                            mode: 'markers',
                            type: 'scatter'
                        };

                        var trace2 = {
                            x: ['sevilla', 'malaga'],
                            y: [ExtA[0], ExtB[0]],
                            mode: 'lines',
                            type: 'scatter'
                        };
                       
                        var data = [trace1, trace2];

                        Plotly.newPlot('myDivExt', data);
                    



                        });



                });

            console.log(dataS);
            console.log(ExtA);



        }

    }]);
