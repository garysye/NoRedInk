import React from 'react';
import TestStore from '../stores/TestStore';

var TestEntry = React.createClass({
  getInitialState: function() {
    return {
      finished: false,
      passed: false,
      started: false
    };
  },

  componentDidMount: function() {
    TestStore.setTestCallback(this.props.testIndex, this.handleTestCompletion);
    TestStore.addChangeListener(() => this.setState({started: true}));
  },

  handleTestCompletion: function(testPassed) {
    this.setState({finished: true, passed: testPassed});
    this.props.onTestCompletion && this.props.onTestCompletion(testPassed);
  },

  render: function() {
    var status;
    var statusClass = "test-status ";
    if (!this.state.started) {
      status = 'Not Started';
      statusClass += "status-not-started";
    } else {
      if (this.state.passed) {
        status = 'Passed';
        statusClass += "status-passed";
      } else {
        if (this.state.finished) {
          status = 'Failed';
          statusClass += "status-failed";
        } else {
          status = 'Running';
          statusClass += "status-running";
        }
      }
    }
    return (
      <li className="entry-test">
        <span className="test-description">{this.props.test.description}</span>
        <span className={statusClass}>{status}</span>
      </li>
    );
  }

});

export default TestEntry;
