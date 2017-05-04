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
            getResultsPage(1);
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
        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(newPage) {
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
                        getResultsPage(1);
                    })
            }
            /*   
            $scope.updateStat = function(province, year) {
                   $http
                       .put("api/v2/export-and-import/" + province + "/" + year + $scope.apikey, $scope.newStat)
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
                           getResultsPage(1);
                       })
               }*/

        $scope.loadInitial = function() {
            $http
                .get("api/v2/export-and-import/loadInitialData" + $scope.apikey)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Load Stats");
                    getResultsPage(1);
                })
        }
        $scope.deleteStat = function(province, year) {
            $http
                .delete("api/v2/export-and-import/" + province + "/" + year + $scope.apikey, $scope.newStat)
                .then(function(response) {
                    $scope.errorMessage = bootbox.alert("Stat delete");
                    getResultsPage(1);

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
                    getResultsPage(1);

                }, function(response) {
                    $scope.stats = [];
                    if (response.status == 404) {
                        $scope.errorMessage = bootbox.alert("Stat is empty");
                    }
                })
        }
    }]);


angular.module("ManagerApp")
    .filter('offset', function() {
        return function(input, start) {
            if (!input || !input.length) {
                return;
            }
            start = +start; //parse to int
            return input.slice(start);
        };

    });
