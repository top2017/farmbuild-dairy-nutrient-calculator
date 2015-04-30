/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/fertilizerPurchased singleton
 * @module nutrientCalculator/fertilizerPurchased
 */
angular.module('farmbuild.nutrientCalculator')

  .factory('fertilizerPurchased', function (validations, fertilizerDefaults, fertilizerTypes, $log) {

    var fertilizerPurchased = {types:fertilizerTypes},
      _isPositiveNumber = validations.isPositiveNumber,
      _isAlphanumeric = validations.isAlphanumeric,
      _isDefined = validations.isDefined,
      _fertilizer = [];

    function _validate(fertilizer) {
      $log.info('validating fertilizer...', fertilizer);

      if (!_isDefined(fertilizer.type) || !_isDefined(fertilizer.weight) || !_isDefined(fertilizer.isDry)) {
        $log.error('invalid fertilizer, must have type, weight and isDry: %j', fertilizer);
        return false;
      }

      return fertilizerTypes.validate(fertilizer.type);
    };

    function createResult(total) {
      return {
        fertilizers: [],
        weight: total.weight,
        dryMatterWeight: total.dryMatterWeight,
        nitrogenInKg: total.nitrogenInKg,
        nitrogenPercentage: 0,
        phosphorusInKg: total.phosphorusInKg,
        phosphorusPercentage: 0,
        potassiumInKg: total.potassiumInKg,
        potassiumPercentage: 0,
        sulphurInKg: total.sulphurInKg,
        sulphurPercentage: 0
      };
    }

    function calculatePercentage(nutrientWeight, totalWeight) {
      return (nutrientWeight / totalWeight) * 100
    }

    function calculateResult(itemsTotal) {
      var result = createResult(itemsTotal);

      result.nitrogenPercentage = calculatePercentage(itemsTotal.nitrogenInKg, itemsTotal.dryMatterWeight);
      result.phosphorusPercentage = calculatePercentage(itemsTotal.phosphorusInKg, itemsTotal.dryMatterWeight);
      result.potassiumPercentage = calculatePercentage(itemsTotal.potassiumInKg, itemsTotal.dryMatterWeight);
      result.sulphurPercentage = calculatePercentage(itemsTotal.sulphurInKg, itemsTotal.dryMatterWeight);

      return result;
    }

    function createItemsTotal() {
      return {
        weight:0,
        dryMatterWeight:0,
        nitrogenInKg:0,
        phosphorusInKg:0,
        potassiumInKg:0,
        sulphurInKg:0,
        incomings:[]
      }
    }


    function calculateNutrientInKg(weight, percentage) {
      return (weight * percentage) / 100;
    }

    function calculateNutrientInFertilizer(fertilizer, itemsTotal) {
      var type = fertilizer.type,
        weight = fertilizer.weight,
        dryMatterWeight = (fertilizer.isDry?weight:calculateNutrientInKg(weight, type.dryMatterPercentage))
        ;

      itemsTotal.weight += weight;
      itemsTotal.dryMatterWeight += dryMatterWeight;
      itemsTotal.nitrogenInKg += calculateNutrientInKg(dryMatterWeight, type.nitrogenPercentage);
      itemsTotal.phosphorusInKg += calculateNutrientInKg(dryMatterWeight, type.phosphorusPercentage);
      itemsTotal.potassiumInKg += calculateNutrientInKg(dryMatterWeight, type.potassiumPercentage);
      itemsTotal.sulphurInKg += calculateNutrientInKg(dryMatterWeight, type.sulphurPercentage);

      itemsTotal.incomings.push({
        type: fertilizer.type,
        weight: fertilizer.weight,
        isDry: fertilizer.isDry
      });

      return itemsTotal;
    }

    function calculateNutrientInFertilizers(fertilizers) {
      $log.info('calculateNutrientInFertilizers...');
      var i = 0,
        itemsTotal = createItemsTotal();

      for (i; i < fertilizers.length; i++) {
        var fertilizer = fertilizers[i];

        if (!_validate(fertilizer)) {
          $log.error('calculateNutrientInFertilizers invalid fertilizer at %s: %j', i, fertilizer);
          return undefined;
        }

        itemsTotal = calculateNutrientInFertilizer(fertilizer, itemsTotal);
      }

      return itemsTotal;
    }

    fertilizerPurchased.calculate = function(fertilizers) {
      $log.info('fertilizerPurchased.calculate...');

      var itemsTotal = calculateNutrientInFertilizers(fertilizers);

      if(!_isDefined(itemsTotal)) {
        $log.error('fertilizerPurchased.calculate invalid fertilizers, see the error above and fix based on API...');
        return undefined;
      }

      return calculateResult(itemsTotal);
    }

    return fertilizerPurchased;
  });