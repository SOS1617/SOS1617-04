angular.module("ManagerApp")
    .controller("ExportApi1Ctrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("ExportApi1Ctrl");


        $scope.sta = [];

        $http
            .get("api/v3/export-and-import")
            .then(function(response) {
                    var proF = [];
                    var long = [];
                    var lati = [];
                    var data = [];

                    $scope.sta = response.data;
                    var pro = [];
                    for (var i in $scope.sta) {
                        pro.push($scope.sta[i].province);
                    }

                    proF = pro.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });
                    proF.sort();

                    for (var i = 0; i < proF.length; i++) {
                        getRes(i);
                    }

                    function getRes(i) {
                        $http
                            .get("https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=" + proF[i] + "%2Cspain&mashape-key=fCyb1JRRYUmshJV7IjyIQJUDcg9yp1gfB0MjsnmaS3qyCQKdYm")
                            .then(function(result) {
                                data.push(proF[i]);
                                lati.push(parseFloat(result.data["Results"][0].lat));
                                long.push(parseFloat(result.data["Results"][0].lon));
                            });
                    }

                    setTimeout(function() {
                        console.log(data);
                        Highcharts.chart('container', {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: 'Latitude and longitude'
                            },
                            
                            xAxis: {
                                categories: data
                            },
                            yAxis: {
                                title: {
                                    text: 'Latitude and longitude'
                                }
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                name: 'longitude',
                                data: long
                            }, {
                                name: 'latitude',
                                data: lati
                            }]
                        });


                    }, 5000);




                },
                function(response) {
                    $scope.sta = [];
                });
    }]);
