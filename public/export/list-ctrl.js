angular.module("ManagerApp")
    .controller("ListCtrlExport", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrlExport");
        var res = "";
        $scope.stats = [];
        $scope.currentPage = 1;
        $scope.pageSize = 5;


        function boton() {
            console.log($scope.currentPage + " " + ($scope.numPages - 1))
            if ($scope.currentPage <= 1) {
                document.getElementById("pre").disabled = true;
            }
            else {
                document.getElementById("pre").disabled = false;
            }
            if ($scope.currentPage === $scope.numPages ) {
                document.getElementById("nex").disabled = true;
            }
            else {
                document.getElementById("nex").disabled = false;
            }
        }




        $scope.searchFrom = function(from, to) {
            $http
                .get("/api/v3/export-and-import" + "&from=" + from + "&to=" + to)
                .then(function(response) {
                    $scope.stats = response.data;
                }, function(response) {
                    $scope.stats = [];
                });
        }
        $scope.search = function() {
            res = "";
            if ($scope.province !== undefined && $scope.province !== "") {
                if (res === "") {
                    res = res + "?province=" + $scope.province;
                }
                else {
                    res = res + "&province=" + $scope.province;
                }
            }

            if ($scope.year !== undefined && $scope.year !== "") {
                if (res === "") {
                    res = res + "?year=" + $scope.year;
                }
                else {
                    res = res + "&year=" + $scope.year;
                }
            }

            if ($scope.oil != undefined && $scope.oil !== "") {
                if (res === "") {
                    res = res + "?oil=" + $scope.oil;
                }
                else {
                    res = res + "&oil=" + $scope.oil;
                }
            }
            if ($scope.importS != undefined && $scope.importS !== "") {
                if (res === "") {
                    res = res + "?importS=" + $scope.importS;
                }
                else {
                    res = res + "&importS=" + $scope.importS;
                }
            }
            if ($scope.exportS != undefined && $scope.exportS !== "") {
                if (res === "") {
                    res = res + "?exportS=" + $scope.exportS;
                }
                else {
                    res = res + "&exportS=" + $scope.exportS;
                }

            }
            $http
                .get("api/v3/export-and-import" + res)
                .then(function(response) {
                    $scope.stats = response.data;
                    console.log($scope.stats);
                }, function(response) {
                    $scope.stats = [];
                });
        }
        $scope.pageMore = function() {
            $scope.currentPage++;
            boton();

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
            boton();

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
                    boton();
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
