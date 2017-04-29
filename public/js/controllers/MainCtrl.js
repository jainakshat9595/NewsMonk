angular.module('MainCtrl', []).controller('MainController', function($scope, $http, Main) {

	$scope.tagline = 'To the moon and back!';	

	$scope.sources = [];

	$scope.articles = [];
	$scope.showLoadBlock = false;

	$scope.displayProgressBar = false;

	$scope.generateTopicsData;
	$scope.classifyTopicsData;

	$scope.noTopics = 3;

	$http({
		method: 'GET',
		url: '/api/sources'
		}).then(function successCallback(response) {
			$scope.sources = response.data;
		}, function errorCallback(response) {
			console.log(response);
	});	

	$scope.refresh = function(source_id) {
		$scope.classifyTopicsData = new Array();
		$scope.showLoadBlock = true;
		Main.getNews(source_id).then(function(data) {
			$scope.showLoadBlock = false;
			
			data.forEach(function(element) {
				$scope.classifyTopicsData.push({
					'sentenceString' : element.description,
					'topics' : new Array()
					}
				);
			}, this);
      		
		});

	}

	$scope.generateTopics = function() {
		$scope.showLoadBlock = true;
		Main.getTopics($scope.noTopics).then(function(data) {
			$scope.generateTopicsData = new Array($scope.noTopics);
			$scope.classifyTopicsData = new Array(data.noSentences);
			
			data.generateResult.forEach(function(element) {
				if(!$scope.generateTopicsData[element.topic]) {
					$scope.generateTopicsData[element.topic] = {
						'words' : new Array(),
						'label' : ''
					};
				}
				var word = {
					'wordName' : element.word,
					'wordProb' : element.prob,
				 };
				 $scope.generateTopicsData[element.topic].words.push(word);
				 if($scope.generateTopicsData[element.topic].label == '') {
					$scope.generateTopicsData[element.topic].label = element.word;
				 }
			}, this);

			console.log($scope.generateTopicsData);

			$scope.showLoadBlock = false;

			data.topicResult.forEach(function(element) {
				if(!$scope.classifyTopicsData[element.sentenceIndex]) {
					$scope.classifyTopicsData[element.sentenceIndex] = {
						'sentenceString' : element.sentenceString,
						'topics' : new Array()
					};
				}
				 var topic = {
					'topic' : element.topic,
					'prob' : element.prob,
				 };
				 $scope.classifyTopicsData[element.sentenceIndex].topics.push(topic);
			}, this);



			console.log($scope.classifyTopicsData);

		});
	}

	$scope.classifyTopics = function() {
		$scope.displayProgressBar = true;
		console.log("as");
	}

});