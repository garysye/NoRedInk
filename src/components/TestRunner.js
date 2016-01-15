import React from 'react';
import TestEntry from './TestEntry';
import TestStore from '../stores/TestStore';
import TestActions from '../actions/TestActions';

var TestRunner = React.createClass({
  getInitialState: function() {
    return {
      tests: TestStore.getTests(),
      passed: 0,
      completed: 0,
      total: TestStore.getTests().length
    }
  },

  handleStartButtonPress: function() {
    TestActions.startTests();
  },

  handleTestCompletion: function(testPassed) {
    var completed = this.state.completed + 1;
    var passed = this.state.passed;
    if (testPassed) {
      passed++;
    }
    this.setState({completed: completed, passed: passed});
  },

  render: function() {
    var tests = [];
    var completionMessage;
    if (this.state.completed === this.state.total) {
      completionMessage = <div className="message-completion">FINISHED!</div>;
    }
    this.state.tests.forEach((test, index) => {
      tests.push(<TestEntry test={test} key={index} testIndex={index} onTestCompletion={this.handleTestCompletion} />);
    });
    return (
      <div>
        <button onClick={this.handleStartButtonPress}>Start Tests</button>
        <div className="app-status">
          <span className="app-passed status-bar">Tests passed: {this.state.passed}/{this.state.total}</span>
          <span className="app-failed status-bar">Tests passed: {this.state.completed - this.state.passed}/{this.state.total}</span>
        </div>
        <ul className="list-tests">{tests}</ul>
        {completionMessage}
      </div>
    );
  }
});

export default TestRunner;
