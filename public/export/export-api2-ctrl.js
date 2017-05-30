angular.module("ManagerApp")
    .controller("ExportApi2Ctrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
        console.log("ExportApi2Ctrl");


        $scope.sta = [];

        $http
            .get("api/v3/export-and-import")
            .then(function(response) {
                    var proF = [];
                    var long = [];
                    var lati = [];
                    var data = [];
                    var temp = [];

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
                        var la;
                        var lo;
                        $http
                            .get("https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=" + proF[i] + "%2Cspain&mashape-key=fCyb1JRRYUmshJV7IjyIQJUDcg9yp1gfB0MjsnmaS3qyCQKdYm")
                            .then(function(result) {
                                data.push(proF[i]);
                                la = parseFloat(result.data["Results"][0].lat);
                                lo = parseFloat(result.data["Results"][0].lon);
                                $http
                                    .get("https://simple-weather.p.mashape.com/weather?lat=" + la + "&lng=" + lo + "&mashape-key=fCyb1JRRYUmshJV7IjyIQJUDcg9yp1gfB0MjsnmaS3qyCQKdYm")
                                    .then(function(result) {
                                        var t = parseInt(result.data.substring(0, 2));
                                        temp.push(t);

                                    });
                            });

                    }
                    for (var i = 0; i < proF.length; i++) {
                        getTemp(i);
                    }

                    function getTemp(i) {}

                    setTimeout(function() {
                        console.log(temp);
                        console.log(proF);

                        var ctx = document.getElementById("myChart").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: proF,
                                datasets: [{
                                    label: 'Temperature ºC',
                                    data: temp,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                responsive: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });

                    }, 10000);




                },
                function(response) {
                    $scope.sta = [];
                });
    }]);
