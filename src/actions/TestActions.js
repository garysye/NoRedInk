import AppDispatcher from '../dispatchers/AppDispatcher';
import TestConstants from '../constants/TestConstants';

var TestActions = {
  startTests() {
    AppDispatcher.dispatch({
      actionType: TestConstants.START,
    });
  }
};

export default TestActions;
