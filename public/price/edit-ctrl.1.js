angular.module("ManagerApp")
.controller("EditCtrlPrice", ["$scope", "$http","$routeParams", function($scope, $http,$routeParams) {
    $scope.apikey="?apikey=12345"
    console.log("EditCtrl");
    $scope.updateS = function() {
        $http
            .put("api/v2/price-stats/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey, $scope.updateStat)
            .then(function(response) {
                $scope.errorMessage = bootbox.alert("Correct Update");
                $scope.updateStat=response.data;
            }, function(response) {
                $scope.stats = [];
                if (response.status == 422) {
                    $scope.errorMessage = bootbox.alert("Stat empty");
                }
                if (response.status == 404) {
                    $scope.errorMessage = bootbox.alert("Stat not exists");
                }
            })
    }
}]);
