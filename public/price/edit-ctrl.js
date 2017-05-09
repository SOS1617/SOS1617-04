angular.module("ManagerApp")
    .controller("EditCtrlPrice", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("EditCtrl");
        refresh();

        function refresh() {
            $http
                .get("/api/v2/price-stats/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey)
                .then(function(response) {
                    $scope.data = JSON.stringify(response.data, null, 2);
                    $scope.updateStat = (response.data[0])? response.data[0] : response.data;
                });
        }

        $scope.updateS = function() {
            var stat = new Object();
            stat.priceaceite = $scope.updateStat.priceaceite;
            stat.pricevirgen = $scope.updateStat.pricevirgen;
            stat.priceextra = $scope.updateStat.priceextra;

            console.log(stat);
            $http
                .put("api/v2/price-stats/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey, $scope.updateStat)
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
            $location.path("/price");

        };

    }]);
