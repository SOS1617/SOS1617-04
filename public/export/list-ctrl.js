angular.module("ManagerApp")
    .controller("ListCtrlExport", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrlExport");

        $scope.stats = [];
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.searchFrom = function(from, to) {
            console.log("api/v3/export-and-import" + "?from=" + from + "&to=" + to);
            $http
                .get("/api/v3/export-and-import" + "&from=" + from + "&to=" + to)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];
                });
        }
        $scope.pageMore = function() {
            $scope.currentPage++;
            $http
                .get("api/v3/export-and-import" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);
                }, function(response) {
                    $scope.stats = [];
                });
        }
        $scope.pageLess = function() {
            $scope.currentPage--;
            $http
                .get("api/v3/export-and-import" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);

                }, function(response) {
                    $scope.stats = [];
                });
        }

        function initial() {
            $http
                .get("api/v3/export-and-import" + "?limit=" + ($scope.pageSize) + "&offset=" + (($scope.currentPage - 1) * $scope.pageSize))
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);
                }, function(response) {
                    $scope.stats = [];
                });
        }

        function refresh() {
            $http
                .get("api/v3/export-and-import" + "?limit=1000")
                .then(function(response) {
                    $scope.data = response.data;
                    $scope.numPages = Math.ceil($scope.data.length / $scope.pageSize);
                }, function(response) {
                    $scope.data = [];
                });
        }
        $scope.addStat = function() {
            $http
                .post("api/v3/export-and-import", $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Add stat");
                    refresh();
                    initial();
                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 422) {
                        $scope.errorMessage = bootbox.alert("Fields cannot be empty ");
                    }
                    if (response.status == 409) {
                        $scope.errorMessage = bootbox.alert("Stat already exists");
                    }
                })
        }
        $scope.loadInitial = function() {
            $http
                .get("api/v3/export-and-import/loadInitialData")
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Load Stats");
                    refresh();
                    initial();
                })
        }
        $scope.deleteStat = function(province, year) {
            $http
                .delete("api/v3/export-and-import/" + province + "/" + year, $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Stat delete");
                    refresh();
                    initial();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat not exists");
                    }
                })
        }
        $scope.deleteAll = function() {
            $http
                .delete("api/v3/export-and-import")
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Delete all stats");
                    refresh();
                    initial();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat is empty");
                    }
                })
        }
        refresh();
        initial();
    }]);
