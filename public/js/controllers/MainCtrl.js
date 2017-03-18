angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tagline = 'To the moon and back!';	

	$scope.sources = [];

	$scope.articles = [];

	$http({
	method: 'GET',
	url: '/api/sources'
	}).then(function successCallback(response) {
		$scope.sources = response.data;
	}, function errorCallback(response) {
		console.log(response);
	});	
	$http({
		method: 'GET',
		url: '/api/news/the-next-web'
		}).then(function successCallback(response) {
			$scope.articles = response.data;
		}, function errorCallback(response) {
			console.log(response);
		});	

	$scope.refresh = function(source_id) {
		console.log("Asase");
		
	}

});