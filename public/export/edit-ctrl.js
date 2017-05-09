angular.module("ManagerApp")
    .controller("EditCtrlExport", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        $scope.apikey = "?apikey=12345"
        console.log("EditCtrl");
        refresh();

        function refresh() {
            $http
                .get("/api/v2/export-and-import/" + $routeParams.province + "/" + $routeParams.year + $scope.apikey)
                .then(function(response) {
                    $scope.data = JSON.stringify(response.data, null, 2);
                    $scope.updateStat = response.data[0];
                });
        }


        $scope.updateS = function() {
            var stat = new Object();
            stat.province = $scope.updateStat.province;
            stat.year = $scope.updateStat.year;
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
            $location.path("/export");

        };



    }]);
