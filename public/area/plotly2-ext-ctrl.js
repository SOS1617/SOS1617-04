angular.module("ManagerApp")
    .controller("Plotly2ExtCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {

            console.log("Plotly2ExtCtrl");
            var dataM= [];
            var dataS = [];

            //api externa
            $http
                .get("https://cosmin-us-phone-number-lookup.p.mashape.com/get.php?phone=3055050000&mashape-key=g75tu3kuAGmsh11AhtOqywfqTTMKp1CSz0PjsnDYAlVt6hgY41")
                .then(function(response) {
                    $scope.sta = response.data.phone_number.npa;
                    console.log($scope.sta);

                    $http
                        .get("api/v3/area-and-production")
                        .then(function(response) {
                            $scope.stat = response.data;
                            for (var i in $scope.stat) {
                                if ($scope.stat[i].year === $scope.year) {
                                    switch ($scope.stat[i].province) {
                                        case "sevilla":
                                            dataS.push(parseInt($scope.stat[i].areaS));
                                            break;
                                        case "malaga":
                                            dataM.push(parseInt($scope.stat[i].areaS));
                                            break;    
                                    }
                                }
                            }
                            //grafica
                            var trace1 = {
                            x: ['sevilla', 'malaga'],
                            y: [dataS[0],dataM[0]],
                            mode: 'markers',
                            type: 'scatter'
                        };

                        var trace2 = {
                            x: ['Phone npa'],
                            y: [ parseInt($scope.sta)],
                            mode: 'lines',
                            type: 'scatter'
                        };
                       
                        var data = [trace1, trace2];

                        Plotly.newPlot('myDivExt2', data);
                    


    });

});

}]);
