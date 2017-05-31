angular.module("ManagerApp")
    .controller("PlotlyExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.change = function() {
            var dataS = [];
            var dataM = [];
            var extA = [];
            

            $http
                .get("https://irythia-hs.p.mashape.com/card?name=Ysera&mashape-key=g75tu3kuAGmsh11AhtOqywfqTTMKp1CSz0PjsnDYAlVt6hgY41")
                .then(function(response) {
                    $scope.sta = response.data.health;
                   
                       
                            
                                

                            
                        
                    

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
                            x: ['Ysera health'],
                            y: [ parseInt($scope.sta)],
                            mode: 'lines',
                            type: 'scatter'
                        };
                       
                        var data = [trace1, trace2];

                        Plotly.newPlot('myDivExt', data);
                    



                        });



                });

            console.log(dataS);
            console.log(extA);



        }

    }]);
