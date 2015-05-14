/**
 * This blank test shows:
 * notice it's not 'use strict';
 * how to set $log so it ouputs to console
 * how to use the test data using fixture
 */
describe('farmbuild.nutrientCalculator module', function() {
  //access test data under data dir
  beforeEach(function() {
    fixture.setBase('examples/data')
  })

  // instantiate log
  var $log, nutrientCalculator,
    susanFarm = 'farmdata-susan.json',
    susanFarmName = "Susan's Farm",
    susanFarmArea = 89.95,
    milkingAreaInHa= 70.39,
    averageCowWeightInKg= 550,
    numberOfMilkingCows= 228,
    numberOfMilkingDays= 365;
  beforeEach(module('farmbuild.farmdata', function($provide) {
    $provide.value('$log', console)
  }));
  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console)
  }));

  beforeEach(inject(function (_$log_, _nutrientCalculator_) {
    $log = _$log_
    nutrientCalculator = _nutrientCalculator_
  }))

  describe('Loading the existing susans farm data', function() {
    it('Load from file should create the complete farmdata.nutrientCalculator section', inject(function() {
      var loaded = fixture.load(susanFarm);
      $log.info('loaded: %j', loaded)

      expect(loaded).toBeDefined()
      expect(nutrientCalculator.farmdata.isFarmData(loaded)).toBeTruthy()
      loaded = nutrientCalculator.load(loaded)
      expect(loaded).toBeDefined()
      expect(loaded.name).toBe(susanFarmName)
      expect(loaded.nutrientCalculator).toBeDefined()
      expect(loaded.nutrientCalculator.summary).toBeDefined()
      expect(loaded.nutrientCalculator.summary.milkingAreaInHa).toBe(milkingAreaInHa)
      expect(loaded.nutrientCalculator.summary.milkingAreaInHa).toBe(milkingAreaInHa)


      //nutrientCalculator.
    }))
  })

  afterEach(function() {
    fixture.cleanup()
  });
});
