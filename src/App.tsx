import React, { useState, SyntheticEvent } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import moment from 'moment';
import './index.css'

const SnoozeComponents = (props: any) => {

  const isEarlierThanEndLimit = (timeValue: string, endLimit: string, lastValue: string) => {
    const timeValueIsEarlier = moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA')) < 0;
    const timeValueIsLaterThanLastValue = lastValue === "" ? true : moment(lastValue, 'h:mmA').diff(moment(timeValue, 'h:mmA')) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  }

  let timeValue = "12:00AM";
  let lastValue = "";
  const endLimit = "11:59PM";
  const step = 30;

  const snoozeTimeOptions = [{ key: timeValue, text: timeValue, value: timeValue }];
  snoozeTimeOptions.push({ key: timeValue, text: timeValue, value: timeValue });

  while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
    lastValue = timeValue;
    timeValue = moment(timeValue, 'h:mmA').add(step, 'minutes').format('h:mmA');
    snoozeTimeOptions.push({ key: timeValue, text: timeValue, value: timeValue });
  }
  snoozeTimeOptions.pop();

  const [selectedSnoozeTime, setSelectedSnoozeTime] = useState(snoozeTimeOptions[16]);

  const handleSnoozeTimeChange = (event: SyntheticEvent<HTMLElement>, data: any) => {
    setSelectedSnoozeTime({
      key: data.value,
      text: data.value,
      value: data.value
    });
  }

  const snoozeTypeOptions = [
    {
      key: "I need to wake up by...",
      text: "I need to wake up by...",
      value: "I need to wake up by..."
    },
    {
      key: "I plan to sleep by...",
      text: "I plan to sleep by...",
      value: "I plan to sleep by..."
    }
  ];

  const [selectedSnoozeType, setSelectedSnoozeType] = useState(snoozeTypeOptions[0]);

  const handleSnoozeTypeChange = (event: SyntheticEvent<HTMLElement>, data: any) => {
    setSelectedSnoozeType({
      key: data.value,
      text: data.value,
      value: data.value
    });
  }

  const SnoozeInputComponents: React.FC = () => {
    return (
      <Form>
        <Form.Field>
          <Dropdown
            fluid
            selection
            value={selectedSnoozeType.value}
            options={snoozeTypeOptions}
            onChange={handleSnoozeTypeChange}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            fluid
            selection
            value={selectedSnoozeTime.value}
            options={snoozeTimeOptions}
            onChange={handleSnoozeTimeChange}
          />
        </Form.Field>
      </Form>
    );
  }


  const SnoozeOutputComponents: React.FC = () => {
    return (
      <div>
        <p>Selected type: {selectedSnoozeType.value}</p>
        <p>Selected time: {selectedSnoozeTime.value}</p>
      </div>
    );
  }

  const isSubmitted: boolean = props.isSubmitted;
  if (!isSubmitted) {
    return <SnoozeInputComponents />
  }
  return <SnoozeOutputComponents />;
}

const SubmitButton = (props: any) => {
  return (
    <Button primary onClick={props.onClick}>
      Calculate Snooze Times
    </Button>
  );
}

const RestartButton = (props: any) => {
  return (
    <Button primary onClick={props.onClick}>
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
        <h1 className="title">Sleep Calculator</h1>
        <SnoozeComponents isSubmitted={isSubmitted} />
        {button}
      </div>
    );
  }
}

export default App;
