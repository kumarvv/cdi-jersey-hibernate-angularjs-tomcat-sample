var app = angular.module("sampleApp", ['ui.bootstrap'], function(){});

app.service("airportService", ['$http',
	function($http) {
		var getAirports = function() {
			return $http({
				method: 'GET',
				url: "api/airports"
			});
		};

		var searchAirports = function(str) {
			return $http({
				method: 'GET',
				url: "api/airports/search/" + str
			});
		};

		var saveAirport = function(airport) {
			return $http({
				method: "POST",
				url: "api/airports",
				data: airport
			});
		};

		var updateAirport = function(airport) {
			return $http({
				method : "PUT",
				url : "api/airports",
				data : airport
			});
		};

		var deleteAirport = function(id) {
			return $http({
				method: 'DELETE',
				url: "api/airports/" + id
			});
		};

		return {
			getAirports : getAirports,
			searchAirports : searchAirports,
			saveAirport : saveAirport,
			updateAirport : updateAirport,
			deleteAirport : deleteAirport
		};
	}
]);

app.controller("sampleController", ["$scope","airportService", "$modal", function($scope, airportService, $modal) {
	$scope.searchAirport = "";
	$scope.airports = [];
	$scope.selectedAirport = {};

	$scope.searchAirports = function() {
		airportService.searchAirports($scope.searchAirport).then(function(result) {
			if (result) {
				$scope.airports = result.data;
			}
		});
	};
	$scope.getAirports = function() {
		airportService.getAirports().then(function(result) {
			if (result) {
				$scope.airports = result.data;
			}
		});
	};

	$scope.showAirportModal = function (airport) {
		$scope.selectedAirport = airport;

		var modalInstance = $modal.open({
			templateUrl: 'editAirportModal.html',
			controller: 'editAirportModalController',
			backdrop: 'static',
			resolve: {
				selectedAirport: function () {
					return $scope.selectedAirport;
				}
			}
		});

		modalInstance.result.then(function (data) {
			if (data) {
				$scope.selectedAirport = data.selectedAirport;

				if (!data.isExistingAirport) {
					if ($scope.airports) {
						$scope.airports.push(data.selectedAirport);
					} else {
						$scope.airports = [ data.selectedAirport ];
					}
					//mlSetFocus(data.selectedAirport.id);
				}
			}
		}, function () {
			//$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.deleteAirportModal = function (airport) {
		$scope.selectedAirport = airport;

		var modalInstance = $modal.open({
			templateUrl: 'deleteAirportModal.html',
			controller: 'deleteAirportModalController',
			backdrop: 'static',
			resolve: {
				selectedAirport: function () {
					return $scope.selectedAirport;
				}
			}
		});

		modalInstance.result.then(function (data) {
			if (data.result != -1) {
				var ix = $scope.airports.indexOf($scope.selectedAirport);
				if (ix >= 0) {
					$scope.airports.splice(ix, 1);
				}
			}
		}, function () {
			//$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.newAirportModal = function() {
		$scope.showAirportModal({});
	};

}]);

app.controller("editAirportModalController", ['$scope', '$modalInstance', 'airportService', 'selectedAirport',
	function($scope, $modalInstance, airportService, selectedAirport) {

		$scope.selectedAirport = selectedAirport;
		if ($scope.selectedAirport.id > 0) {
			$scope.isExistingAirport = true;
		} else {
			$scope.isExistingAirport = false;
		};

		$scope.ok = function() {
			airportService.saveAirport($scope.selectedAirport).then(function(result) {
				if (result) {
					$scope.selectedAirport = result.data;
				}
				$modalInstance.close({
					"selectedAirport" : $scope.selectedAirport,
					"isExistingAirport" : $scope.isExistingAirport
				});
			});
		};

		$scope.cancel = function() {
			$modalInstance.dismiss("cancel");
		}
	}
]);

app.controller("deleteAirportModalController", ['$scope', '$modalInstance', 'airportService', 'selectedAirport',
	function($scope, $modalInstance, airportService, selectedAirport) {

		$scope.selectedAirport = selectedAirport;
		$scope.result = 1;
		$scope.ok = function() {
			airportService.deleteAirport($scope.selectedAirport.id)
				 .error(function(data, status, headers, config) {
					 $scope.result = -1;
				 })
				 .then(function(result) {
					 if (result) {
						 $scope.result = 1;
					 };

					 $modalInstance.close({
						 "result" : $scope.result
					 });
				 });
		};

		$scope.cancel = function() {
			$modalInstance.dismiss("cancel");
		}
	}
]);