angular.module("ManagerApp")
    .controller("PlotlyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "?apikey=12345"
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
                .get("api/v2/area-and-production" + $scope.apikey)
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
                        console.log(dataH);
                
                
                
                
                
                var data = [{
                    x: ['sevilla', 'malaga', 'cadiz', 'granada','cordoba','almeria','huelva','jaen'],
                    y: [dataS, dataM, dataCa, dataG, dataCo, dataA, dataH, dataJ],
                    type: 'bar'
                }];

                Plotly.newPlot('myDiv', data); 
               
                     

                    },
                    function(response) {
                        $scope.sta = [];
                    });






        }

    }]);
