angular.module("ManagerApp")
    .controller("PlotlyExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        console.log("PlotlyExtCtrl");

        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            var dataSV = [];
            var electionS = [];


            $http
                .get("https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/bundesliga/seasons/15-16/topscorers")
                .then(function(response) {
                    $scope.sta = response.data;
                    for (var i in $scope.sta) {


                        electionS.push(parseInt($scope.sta[i].number));



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
                                        case "cadiz":
                                            dataCa.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "granada":
                                            dataG.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "cordoba":
                                            dataCo.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "almeria":
                                            dataA.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "jaen":
                                            dataJ.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "huelva":
                                            dataH.push(parseInt($scope.stat[i].areaS));
                                            break;
                                    }
                                }
                            }
                            var data = [{
                                values: [dataS[0], electionS[0]],
                                labels: ['Sevilla', 'Soccer'],
                                type: 'pie'
                            }];

                            var layout = {
                                height: 400,
                                width: 500
                            };

                            Plotly.newPlot('myExtDiv', data, layout);




                        });



                });




        }

    }]);
