describe('concentratesPurchased  module', function() {

  // instantiate service
  var $log;
  var concentratesPurchased, pelletsCalf, pelletsCalfName = 'Pellets Calf',
    pelletsDairy,pelletsDairyName = 'Pellets Dairy',
    averageConcentrate, averageConcentrateName = 'Average concentrate',
    fruit,fruitName='Fruit'
  ;

  beforeEach(module('farmbuild.nutrientCalculator', function($provide) {
    $provide.value('$log', console);
  }));

  beforeEach(inject(function (_$log_, _concentratesPurchased_) {
    $log = _$log_;
    concentratesPurchased  = _concentratesPurchased_;
    pelletsCalf =  concentratesPurchased.types.byName(pelletsCalfName);
    expect(pelletsCalf.name).toEqual(pelletsCalfName);
    pelletsDairy =  concentratesPurchased.types.byName(pelletsDairyName);
    expect(pelletsDairy.name).toEqual(pelletsDairyName);
    averageConcentrate =  concentratesPurchased.types.byName(averageConcentrateName);
    fruit =  concentratesPurchased.types.byName(fruitName);
    expect(fruit.name).toEqual(fruitName);
  }));


  describe('Given concentratesPurchased  factory', function(){
    it('concentratesPurchased  should be defined', inject(function() {
      expect(concentratesPurchased).toBeDefined();
    }));
  });

  function createdConcentrate(type, weight, isDry) {
    return {type: type, weight:weight, isDry:isDry};
  }

  function addConcentrate(type, weight, isDry) {
    return [createdConcentrate(type, weight, isDry)];
  }

  function between(val, min, max) {
    return val >= min && val <= max;
  }

  describe('Given the default value, calculate the nutrient of concentrate purchased', function(){
    it(pelletsCalfName + ' type with undefined amount should fail', inject(function() {
      var result = concentratesPurchased.calculate(addConcentrate(pelletsCalf, true))
      expect(result).toBeUndefined()
    }));

    it(pelletsCalfName + ' type and the weight of 4000kg should calculate', inject(function() {
      var weight = 1850,
        concentrate = addConcentrate(pelletsCalf, weight, true);
      $log.info('concentrate: %j', concentrate);
      var result = concentratesPurchased.calculate(concentrate)

      $log.info('result generated: %j', result);

      expect(result.weight).toEqual(1850)
      expect(result.dryMatterWeight).toEqual(1850)
      expect(result.nitrogenPercentage).toEqual(3.1400000000000006)
      expect(result.nitrogenInKg).toEqual(58.09)
      expect(result.phosphorusInKg).toEqual(12.395)
      expect(between(result.phosphorusPercentage, 0.669, 0.67)).toBeTruthy()
      expect(result.potassiumInKg).toEqual(15.54)
      expect(result.potassiumPercentage).toEqual(0.84)
      expect(result.sulphurInKg).toEqual(5.18)
      expect(result.sulphurPercentage).toEqual(0.27999999999999997)
      expect(result.metabolisableEnergyInMJ).toEqual(23532)
      expect(result.metabolisableEnergyInMJPerKg).toEqual(12.72)
    }));



  });

  describe('Given the default value, calculate the nutrient of concentrate purchased', function(){

    it('DAP, Super and Urea type and the weight of 4000kg, 13000kg, 11000kg', inject(function() {
      var weightPelletsCalf1=18500,weightPelletsDairy1 =81500,
        weightPelletsDairy2 = 20500,weightAverageConcentrate1=78150,weightPelletsCalf2=10120,
        weightPelletsDairy3=96580,weightPelletsDairy4=85710,weightFruit=3280;
        concentrates = concentratesPurchased
          .add(pelletsCalf, weightPelletsCalf1, true)
          .add(pelletsDairy, weightPelletsDairy1, true)
          .add(pelletsDairy, weightPelletsDairy2, true)
          .add(averageConcentrate, weightAverageConcentrate1, true)
          .add(pelletsCalf, weightPelletsCalf2, true)
          .add(pelletsDairy, weightPelletsDairy3, true)
          .add(pelletsDairy, weightPelletsDairy4, true)
          .add(fruit, weightFruit, true)
          .concentrates()
      expect(angular.isArray(concentrates)).toBeTruthy()

      var result = concentratesPurchased.calculate(concentrates)

      $log.info('result generated: %j', result);

      expect(result.weight).toEqual(394340)
      expect(result.dryMatterWeight).toEqual(394340)
      expect(result.nitrogenInKg).toEqual(10758.433)
      expect(result.nitrogenPercentage).toEqual(2.728212456256023)
      expect(result.phosphorusInKg).toEqual(2755.202)
      expect(result.phosphorusPercentage).toBe(0.6986869199168231)
      expect(result.potassiumInKg).toEqual(2928.7960000000003)
      expect(result.potassiumPercentage).toEqual(0.7427083227671553)
      expect(result.sulphurInKg).toEqual(1019.4000000000001)
      expect(result.sulphurPercentage).toEqual(0.25850788659532387)
      expect(result.metabolisableEnergyInMJ).toEqual(4953343.9999999997)
      expect(result.metabolisableEnergyInMJPerKg).toEqual(11.6)
    }));

  });

});

