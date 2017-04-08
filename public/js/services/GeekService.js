angular.module('GeekService', []).factory('Main', ['$q', '$http', function($q, $http) {

	var news = {};

    var getNews = function(source_id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/news/'+source_id
            }).then(function successCallback(response) {
                //console.log(response.data);
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
        });
        return deferred.promise;
    };

    var getTopics = function(noTopics) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/generateTopic/'+noTopics
            }).then(function successCallback(response) {
                //console.log(response.data);
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
        });
        return deferred.promise;
    };

    return {
        getNews: getNews,
        getTopics: getTopics
    };

}]);