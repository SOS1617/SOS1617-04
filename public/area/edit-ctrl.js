angular.module("ManagerApp")
.controller("EditCtrlArea", ["$scope", "$http","$routeParams", function($scope, $http,$routeParams) {
    $scope.apikey="?apikey=12345"
    console.log("EditCtrl");
    refresh();
    
     function refresh() {
            $http
                .get("/api/v2/area-and-production/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey)
                .then(function(response) {
                    $scope.data = JSON.stringify(response.data, null, 2);
                    $scope.updateStat = response.data[0];
                });
        }
    
    
    $scope.updateS = function() {
        var stat = new Object();
            stat.province = $scope.updateStat.province;
            stat.year = $scope.updateStat.year;
            stat.areaS = $scope.updateStat.areaS;
            stat.productionS = $scope.updateStat.productionS;

            console.log(stat);

        
        $http
            .put("api/v2/area-and-production/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey, $scope.updateStat)
            .then(function(response) {
                $scope.errorMessage = bootbox.alert("Correct Update");
                
            }, function(response) {
                $scope.stats = [];
                if (response.status == 422) {
                    $scope.errorMessage = bootbox.alert("Stat empty");
                }
                if (response.status == 404) {
                    $scope.errorMessage = bootbox.alert("Stat not exists");
                }
            });
            $location.path("/area");
    };
}]);
