'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
import TestConstants from '../constants/TestConstants';
import tests from '../tests/tests';

const CHANGE_EVENT = 'changeTest';

var _tests = tests;

var startTests = function() {
  tests.forEach((test) => {
    test.run(test.callback);
  });
};

var TestStore = Object.assign({}, EventEmitter.prototype, {
  getTests: function() {
    return _tests;
  },

  setTestCallback: function(ind, callback) {
    _tests[ind].callback = callback;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

//Sets up App Dispatcher to listen for specfic actions
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case TestConstants.START:
      startTests();
      TestStore.emitChange();
      break;
    default:
  }
});

export default TestStore;
