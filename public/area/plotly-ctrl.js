angular.module("ManagerApp")
    .controller("PlotlyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("PlotlyCtrl");

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
                .get("api/v3/area-and-production")
                .then(function(response) {
                 $scope.sta = response.data;
                        for (var i in $scope.sta) {
                            if ($scope.sta[i].year === $scope.year) {
                                switch ($scope.sta[i].province) {
                                    case "sevilla":
                                        
                                        dataS.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "malaga":
                                        
                                        dataM.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "cadiz":
                                        
                                        dataCa.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "granada":
                                        
                                        dataG.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "cordoba":
                                        
                                        dataCo.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "almeria":
                                        
                                        dataA.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "jaen":
                                        
                                        dataJ.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                    case "huelva":
                                        
                                        dataH.push(parseInt($scope.sta[i].areaS));
                                        
                                        break;
                                }
                            }
                        }
                
                var data = [{
                    x: ['sevilla', 'malaga', 'cadiz', 'granada','cordoba','almeria','huelva','jaen'],
                    y: [dataS[0], dataM[0], dataCa[0], dataG[0], dataCo[0], dataA[0], dataH[0], dataJ[0]],
                    type: 'bar'
                }];

                Plotly.newPlot('myDiv', data); 
                     

                    },
                    function(response) {
                        $scope.sta = [];
                    });
        }

    }]);
