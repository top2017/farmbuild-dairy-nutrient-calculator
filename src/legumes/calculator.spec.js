'use strict';

describe('farmbuild.nutrientCalculator module', function () {

	// instantiate service
	var legumeCalculator,
		legumePercentage = 3.5,
		milkFatInKg = 74080.71,
		milkProteinInKg = 59895.04,
		milkSoldPerYearInLitre = 1751317,
		totalForageME = 6298085,
		totalConcentrateME = 4954078,
		numberOfMilkingDays = 365,
		numberOfMilkingCows = 228,
		milkingArea = 70.39,
		averageUtilisationFactor = 75,
		totalNitrogenFromFertiliser = 5780,
		animalWeight = 550,
		liveWeight = parseFloat(animalWeight)/7;

	beforeEach(module('farmbuild.nutrientCalculator'));

	beforeEach(inject(function (_legumeCalculator_) {
		legumeCalculator = _legumeCalculator_;
	}));

	describe('legumeCalculator factory', function () {
		it('legumeCalculator should be defined', inject(function () {
			expect(legumeCalculator).toBeDefined();
		}));
	});

	describe('calculate legume nutrient', function () {

		it('Calculating milk energy', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg);
			expect(milkEnergy.total).toEqual(9751288.792938001);
			expect(milkEnergy.notSold).toEqual(390051.55171752005);
		}));

		it('Calculating imported energy consumed', inject(function () {
			var importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME);
			expect(importedEnergyConsumed).toEqual(10204602.305);
		}));

		it('Calculating cattle energy used', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight);
			expect(cattleEnergyUsed).toEqual(16680054.630369807);
		}));

		it('Calculating dry matter consumed', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea);
			expect(dryMatterConsumed).toEqual(8761.326115546455);
		}));

		it('Calculating dry matter grown', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea),
				dryMatterGrown = legumeCalculator.dryMatterGrown(dryMatterConsumed, averageUtilisationFactor);
			expect(dryMatterGrown).toEqual(11681.76815406194);
		}));

		it('Calculating average Nitrogen applied', inject(function () {
			var averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea);
			expect(averageNitrogenApplied).toEqual(82.1139366387271);
		}));

		it('Calculating total legume', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, averageUtilisationFactor);
			expect(totalLegume).toEqual(408.8618853921679);
		}));

		it('Calculating available Nitrogen from legumes', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, averageUtilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea),
				availableNitrogenFromLegumes = legumeCalculator.availableNitrogenFromLegumes(totalLegume, averageNitrogenApplied);
			expect(availableNitrogenFromLegumes).toEqual(13.431975500695733);
		}));

		it('Calculating available Nitrogen to pasture', inject(function () {
			var milkEnergy = legumeCalculator.milkEnergy(milkSoldPerYearInLitre, milkFatInKg, milkProteinInKg),
				totalMilkEnergy = milkEnergy.total,
				milkEnergyNotSold = milkEnergy.notSold,
				importedEnergyConsumed = legumeCalculator.importedEnergyConsumed(totalForageME, totalConcentrateME),
				cattleEnergyUsed = legumeCalculator.cattleEnergyUsed(totalMilkEnergy, milkEnergyNotSold, numberOfMilkingCows, numberOfMilkingDays, liveWeight),
				dryMatterConsumed = legumeCalculator.dryMatterConsumed(cattleEnergyUsed, importedEnergyConsumed, milkingArea),
				totalLegume = legumeCalculator.totalLegume(dryMatterConsumed, legumePercentage, averageUtilisationFactor),
				averageNitrogenApplied = legumeCalculator.averageNitrogenApplied(totalNitrogenFromFertiliser, milkingArea),
				availableNitrogenToPasture = legumeCalculator.availableNitrogenToPasture(totalLegume, averageNitrogenApplied);
			expect(availableNitrogenToPasture).toEqual(95.54591213942282);
		}));

	});

});
