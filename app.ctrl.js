(function () {
    var underscore = angular.module('underscore', []);
    underscore.factory('_', function() {
        return window._;
    })

	var FrontDeck = angular.module("FrontDeckApp", [
        'ngRoute',
        'underscore'
    ]);

    FrontDeck.factory("utilSvc", function($http, $q, $location){
        return {
            getSystemInfo:function() {
                var url = '/api/systeminfo/'
                var deferred = $q.defer();
                $http.get(url)
                    .success(function(response){
                        deferred.resolve(response);
                    })
                    .error(function(response){
                        deferred.reject(response);
                    })
                    return deferred.promise;
            }
		}
	});

    FrontDeck.controller('AppCtrl', function($scope, $route, $http, $location, utilSvc){
		$scope.system = {};
		$scope.getSystemInfo = function()
		{
			console.log('getsysetm');
			utilSvc.getSystemInfo().then(
				function(r){
					console.log(r);
					$scope.system = r;
				},
				function(e){
					console.log(e);
				}
			)
		}
		$scope.isActive = function(str)
		{
			return $location.path().indexOf(str)>-1;
		}
		
	});

    FrontDeck.config(function ($routeProvider) {
		$routeProvider
			.when("/home", {
				templateUrl: "default.html"
			})
			.when("/network", {
				templateUrl: "network.html"
			})
			.when("/settings", {
				templateUrl: "settings.html"
			})
			.when("/help", {
				templateUrl: "help.html"
			})
			.otherwise({
				redirectTo: "/home"
			})
    })
})();
