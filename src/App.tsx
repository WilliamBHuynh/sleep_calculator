import React from 'react';
import { Button } from 'semantic-ui-react';
import { SnoozeComponents } from './SnoozeComponents';
import './index.css'

const SubmitButton = (props: any) => {
  return (
    <Button color='yellow' onClick={props.onClick}>
      Calculate Snooze Times
    </Button>
  );
}

const RestartButton = (props: any) => {
  return (
    <Button color='yellow' onClick={props.onClick}>
      Calculate Again
    </Button>
  );
}

class App extends React.Component<{}, { isSubmitted: boolean }> {
  constructor(props: any) {
    super(props);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.state = { isSubmitted: false }
  }

  handleSubmitClick() {
    this.setState({ isSubmitted: true });
  }

  handleRestartClick() {
    this.setState({ isSubmitted: false });
  }

  render() {
    const isSubmitted = this.state.isSubmitted;
    let button = !isSubmitted ? <SubmitButton onClick={this.handleSubmitClick} /> :
      <RestartButton onClick={this.handleRestartClick} />;

    return (
      <div>
        <div>
          <img src='moon.gif' alt='Gif of a cartoon drawn moon' />
        </div>
        <div>
          <h1 className="title">Sleep Calculator</h1>
          <SnoozeComponents isSubmitted={isSubmitted} />
        </div>
        <div className='button'>
          {button}
        </div>
      </div>
    );
  }
}

export default App;
