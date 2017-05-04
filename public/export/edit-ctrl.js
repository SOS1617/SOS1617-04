angular.module("ManagerApp")
    .controller("EditCtrlExport", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("EditCtrl");


        $scope.updateS = function() {

            console.log($scope.updateStat);
            var stat = new Object();
            stat.province = $routeParams.province;
            stat.year = $routeParams.year;
            stat.oil = $scope.updateStat.oil;
            stat.importS = $scope.updateStat.importS;
            stat.exportS = $scope.updateStat.exportS;
            
            console.log(stat);
            $http

                .put("api/v2/export-and-import/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey, stat)
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
           // $location.path("/export");

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
