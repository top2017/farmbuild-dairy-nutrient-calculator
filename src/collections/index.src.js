/**
 * @since 0.0.1
 * @copyright 2015 Spatial Vision, Inc. http://spatialvision.com.au
 * @license The MIT License
 * @author Spatial Vision
 * @version 0.1.0
 */

'use strict';

/**
 * nutrientCalculator/collections singleton
 * @module nutrientCalculator/collections
 */
angular.module('farmbuild.nutrientCalculator')
  .factory('collections', function (validations, $log) {
    var collections = {},
      _isDefined = validations.isDefined,
      _isArray = validations.isArray,
      _equals = validations.equals;

    function _byProperty(collection, property, value) {
      if(!_isArray(collection)) {
        return undefined;
      }
      if(!_isDefined(property)) {
        return undefined;
      }
      if(!_isDefined(value)) {
        return undefined;
      }

      var i = 0;
      for(i; i < collection.length; i++) {
        var item = collection[i];

        if(!item.hasOwnProperty(property)) {
          continue;
        }

        if(_equals(item[property], value)) {
          return item;
        }

      }
      return undefined;
    }

    function _add(collection, item, index) {
      if (_isDefined(index)) {
        collection.splice(index, 0, item)
      } else {
        collection.push(item);
      }
      return collection;
    };

    function _isEmpty(){
      return _collections.length === 0;
    };

    function _count(collection) {
      if(!angular.isArray(collection)) {
        return -1;
      }
      return collection.length;
    };

    function _toArray(){
      return _collections;
    };

    function _at(collection, index){
      return collection[index];
    };

    function _removeAt(collection, index) {
      if (!angular.isArray(collection)) {
        return collection;
      }
      if (!index || index < 0 || index > collection.length - 1) {
        return collection;
      }

      collection.splice(index, 1);

      return collection;
    };


    function _remove(forage) {
      $log.info('removing forage type ', forage);

      if (!_isDefined(forage)) {
        return undefined;
      }

      return _collections;
    };

    function _first(collection) {
      return collection[0];
    };

    function _last(collection) {
      var length = _count(collection);
      return collection[length - 1];
    };

    collections = {
      add: _add,
      at: _at,
      size: _count,
      byProperty:_byProperty,
      removeAt: _removeAt,
      remove: _remove,
      first: _first,
      last: _last,
      isEmpty: _isEmpty
    };

    return collections;
  });