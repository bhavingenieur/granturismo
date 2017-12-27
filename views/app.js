(function(){

var app = angular.module("myapp",[]);

var myctrl = function($scope,$http,$location){
	$scope.user1 = "hello";
	
};
app.controller("myctrl", myctrl);
})();
