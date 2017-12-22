(function(){

var app = angular.module("myapp",[]);

var myctrl = function($scope,$http,$location){
	$scope.user1 = "hello";
	$http.get('https://careless-whisp-bhavinv.c9users.io/get-ang-data').then(function(response){
	    console.log(response.data);
	})
};
app.controller("myctrl", myctrl);
})();
