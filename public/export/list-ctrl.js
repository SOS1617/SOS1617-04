angular.module("ManagerApp")
    .controller("ListCtrlExport", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrlExport");

        $scope.stats = [];
        $scope.currentPage = 1;
        $scope.pageSize = 5;
        var aux = 1;


        $scope.setApikey = function(api) {
            $scope.apikey = "?apikey=" + api;
            aux = 0;
            refresh();
        }

        $scope.searchFrom = function(from, to) {

            console.log("api/v2/export-and-import" + $scope.apikey + "&from=" + from + "&to=" + to);
            $http
                .get("/api/v2/export-and-import" + $scope.apikey + "&from=" + from + "&to=" + to)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];
                });
        }
        $scope.numPage = function() {
            $scope.stats.size/$scope.pageSize;
        }
        $scope.nextPage=function(){
            
            
        }
        function refresh() {
            $http
                .get("api/v2/export-and-import" + $scope.apikey)
                .then(function(response) {
                    if (aux === 0) {
                        $scope.errorMessage = bootbox.alert("Correct Apikey");
                        aux = 1;
                    }
                    $scope.stats = response.data;

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 401) {
                        $scope.errorMessage = bootbox.alert("Apikey cannot be empty ");
                    }
                    if (response.status == 403) {
                        $scope.errorMessage = bootbox.alert("Wrong Apikey");
                    }
                });
        }

        $scope.addStat = function() {
            $http
                .post("api/v2/export-and-import" + $scope.apikey, $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Add stat");
                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 422) {
                        $scope.errorMessage = bootbox.alert("Fields cannot be empty ");
                    }
                    if (response.status == 409) {
                        $scope.errorMessage = bootbox.alert("Stat already exists");
                    }
                    refresh();
                })
        }

        $scope.loadInitial = function() {
            $http
                .get("api/v2/export-and-import/loadInitialData" + $scope.apikey)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Load Stats");
                    refresh();
                })
        }
        $scope.deleteStat = function(province, year) {
            $http
                .delete("api/v2/export-and-import/" + province + "/" + year + $scope.apikey, $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Stat delete");
                    refresh();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat not exists");
                    }
                })
        }
        $scope.deleteAll = function() {
            $http
                .delete("api/v2/export-and-import" + $scope.apikey)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Delete all stats");
                    refresh();

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat is empty");
                    }
                })
        }
    }]);
