app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Controller initialized");
    $scope.viewby = 5;
    $scope.itemsPerPage = $scope.viewby;;
    $scope.currentPage = 0;
    $scope.items = [];
    $scope.setApikey= function(api){
        $scope.apikey="?apikey="+api;
        console.log($scope.apikey);
        refresh();
    }
    function res() {
        for (i = 0; i < $scope.stats.length; i++) {
            $scope.items.push($scope.stats[i]);
        }

    }
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };
    $scope.pageCount = function() {
        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    }
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 0; //reset to first paghe
    }
    function refresh() {
        $http
            .get("api/v1/price"+$scope.apikey)
            .then(function(response) {
                if (!response.data) {
                    console.log("They aren't stat");
                }
                $scope.stats = response.data;
                res();
            });
    }

    $scope.addStat = function() {
        $http
            .post("api/v1/price"+$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Stat added");
                refresh();
            })
    }
    $scope.update = function(province, year) {
        $http
            .put("api/v1/price/" + province + "/" + year+$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Update stats " + province);
                refresh();
            })
    }
    $scope.loadInitial = function() {
        $http
            .get("api/v1/price/loadInitialData"+$scope.apikey)
            .then(function(response) {
                console.log("Load data");
                refresh();
            })
    }
    



    $scope.deleteStat = function(province, year) {
        $http
            .delete("api/v1/price/" + province + "/" + year +$scope.apikey, $scope.newStat)
            .then(function(response) {
                console.log("Deleting stats " + province);
                refresh();
            })
    }
    $scope.deleteAll = function() {
        $http
            .delete("api/v1/price"+$scope.apikey)
            .then(function(response) {
                console.log("Deleting all stats ");
                refresh();
            })
    }

    refresh();




}]);
app.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }
        start = +start; //parse to int
        return input.slice(start);
    };

});
