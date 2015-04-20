angular.module('farmbuild.nutrientCalculator.examples', ['farmbuild.nutrientCalculator'])

	.run(function ($rootScope) {
		$rootScope.appVersion = farmbuild.examples.nutrientcalculator.version;
		$rootScope.decimalPrecision = farmbuild.examples.nutrientcalculator.decimalPrecision;
	})

	.controller('FarmCtrl', function ($scope, NutrientCalculator) {

		$scope.farmData = {};

		$scope.load = function ($fileContent) {
			try {
				$scope.farmData = NutrientCalculator.load(angular.fromJson($fileContent));
			} catch(e){
				console.error('farmbuild.nutrientCalculator.examples > load: Your file should be in json format')
			}
		};

		$scope.milkSold = function () {
			$scope.farmData.nutrientCalculator.milkSold =
				NutrientCalculator.milkSold.calculateByPercent(
					$scope.farmData.nutrientCalculator.milkSold.totalPerYearInLitre,
					$scope.farmData.nutrientCalculator.milkSold.proteinPercentage,
					$scope.farmData.nutrientCalculator.milkSold.fatPercentage)
		};

/*		$scope.exportFarmData = function(farmData){
			var blob = new Blob([angular.toJson(farmData)], { type: 'application/json' }),
					url = window.URL.createObjectURL(blob);
			return url;
		}*/

		$scope.exportFarmData = function(farmData){
			var blob = new Blob([angular.toJson(farmData)], { type: 'application/json' });
			$scope.exUrl = URL.createObjectURL(blob);
		};

	})

	.directive('onReadFile', function ($parse) {
		return {
			restrict: 'A',
			scope: false,
			link: function (scope, element, attrs) {
				var fn = $parse(attrs.onReadFile);

				element.on('change', function (onChangeEvent) {
					var reader = new FileReader();

					reader.onload = function (onLoadEvent) {
						scope.$apply(function () {
							fn(scope, {$fileContent: onLoadEvent.target.result});
						});
					};

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	});