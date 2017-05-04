angular.module("ManagerApp")
    .controller("EditCtrlExport", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("EditCtrl");


        $scope.updateS = function() {
            console.log("api/v2/export-and-import/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey);
            $http

                .put("api/v2/export-and-import/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey, $scope.update)
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
            $location.path("/export");

        };
        getResultsPage(1);


        function getResultsPage(newPage) {
            $http
                .get("api/v2/export-and-import" + $scope.apikey)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];

                });
        }
    }]);
