'use strict';

describe('farmbuild.nutrientCalculator module', function() {

 // define nutrientCalculator service
  var nutrientCalculator;

  // inject farmbuild.nutrientCalculator module
  beforeEach(module('farmbuild.nutrientCalculator'));

  // inject nutrientCalculator service
  beforeEach(inject(function (_nutrientCalculator_) {
    nutrientCalculator = _nutrientCalculator_;
  }));

  describe('nutrientCalculator factory', function(){

    it('nutrientCalculator factory should be defined', inject(function() {
      expect(nutrientCalculator).toBeDefined();
    }));

    it('window.farmbuild name space should be defined', inject(function() {
      expect(window.farmbuild).toBeDefined();
    }));

    it('nutrientCalculator.milkSold should be defined', inject(function() {
      expect(nutrientCalculator.milkSold).toBeDefined();
    }));

    it('nutrientCalculator.animalsPurchased should be defined', inject(function() {
      expect(nutrientCalculator.cowsPurchased).toBeDefined();
    }));

    it('nutrientCalculator.animalsPurchased should be defined', inject(function() {
      expect(nutrientCalculator.cowsCulled).toBeDefined();
    }));

    it('nutrientCalculator.load should add nutrientCalculator block', inject(function() {
      var farmData = {name: 'Susan\'s farm'};
      farmData = nutrientCalculator.load(farmData);
      expect(farmData.nutrientCalculator).toBeDefined();
    }));

    it('nutrientCalculator.load return value should have the correct name', inject(function() {
      var name = 'Susan\'s farm', farmData = {name: name};
      farmData = nutrientCalculator.load(farmData);
      expect(farmData.name).toMatch(name);
    }));

  });

});
