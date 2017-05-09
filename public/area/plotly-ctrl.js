angular.module("ManagerApp")
    .controller("PlotlyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

        $scope.apikey = "?apikey=12345"
        console.log("PlotlyCtrl");

        //$scope.change = function() {
            var categoriesH = [];
            var dataS = [];
            var dataM = [];
            var dataCa = [];
            var dataG = [];
            var dataCo = [];
            var dataA = [];
            var dataJ = [];
            var dataH = [];
            $http
                .get("api/v2/area-and-production" + $scope.apikey)
                .then(function(response) {
                        $scope.sta = response.data;
                var cat = [];
                for (var i in $scope.sta) {
                    cat.push($scope.sta[i].year);
                    switch ($scope.sta[i].province) {
                        case "sevilla":
                            dataS.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "malaga":
                            dataM.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "cadiz":
                            dataCa.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "granada":
                            dataG.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "cordoba":
                            dataCo.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "almeria":
                            dataA.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "huelva":
                            dataH.push(parseInt($scope.sta[i].areaS));
                            break;
                        case "sevilla":
                            dataS.push(parseInt($scope.sta[i].areaS));
                            break;
                    }
                }
                cat.sort();
                categoriesH = cat.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });
                var data = [{
                    x: ['sevilla', 'malaga', 'cadiz', 'granada','cordoba','almeria','huelva'],
                    y: [dataS, dataM, dataCa,dataG,dataCo,dataA,dataH],
                    type: 'bar'
                }];

                Plotly.newPlot('myDiv', data);
                     

                    },
                    function(response) {
                        $scope.sta = [];
                    });






        //}

    }]);
