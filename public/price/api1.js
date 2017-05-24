/**
 * https://market.mashape.com/divad12/numbers-1
 */
angular.module("ManagerApp")
    .controller("api1", ["$scope", "$http", "$location", function($scope, $http, $location) {

        // Dato api propia
        var datoApiPropia;
        $http
            .get("api/v2/price-stats?apikey=12345&&year=2014&province=sevilla")
            .then(function(response) {
                    $scope.sta = response.data;
                    console.log(response.data);
                    for (var i in $scope.sta) {
                        datoApiPropia = parseFloat($scope.sta[i].pricevirgen);
                    }
                },
                function(response) {
                    $scope.sta = [];
                });
        console.log(datoApiPropia)

        $http
            .get("https://numbersapi.p.mashape.com/6/21/date?fragment=true&json=true&mashape-key=YaJy4LPugsmshktTkd17zwvP56Aap1IdBzEjsndGfn4xhLsyoC")
            .then(function(response) {
                    // response.data
                    // **** Dibujar gráfica
                    var chart = new CanvasJS.Chart("chartContainer", {
                        title: {
                            text: response.data.text
                        },
                        data: [{
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            name: "Precio aceite",
                            dataPoints: [{
                                label: response.data.year,
                                y: parseFloat(response.data.number)
                            }, {
                                label: "Precio aceite virgen extra sevilla 2014",
                                y: parseFloat(datoApiPropia)
                            }]
                        }],
                        height: 400,
                    });
                    chart.render();
                    //**** Fin Dibujar gráfica

                },
                function(response) {
                    $scope.sta = [];
                });


    }]);