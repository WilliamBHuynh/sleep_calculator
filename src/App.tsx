import React, { useState, SyntheticEvent } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import moment from 'moment';
import './index.css'

const App: React.FC = () => {

  const isEarlierThanEndLimit = (timeValue: string, endLimit: string, lastValue: string) => {
    const timeValueIsEarlier = moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA')) < 0;
    const timeValueIsLaterThanLastValue = lastValue === "" ? true : moment(lastValue, 'h:mmA').diff(moment(timeValue, 'h:mmA')) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  }

  let timeValue = "12:00AM";
  let lastValue = "";
  const endLimit = "11:59PM";
  const step = 30;

  var snoozeTimeOptions = [];
  snoozeTimeOptions.push({ key: timeValue, text: timeValue, value: timeValue });

  while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
    lastValue = timeValue;
    console.log(timeValue, moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA'), 'minutes'));
    timeValue = moment(timeValue, 'h:mmA').add(step, 'minutes').format('h:mmA');
    snoozeTimeOptions.push({ key: timeValue, text: timeValue, value: timeValue });
  }
  snoozeTimeOptions.pop();

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
    if (data) {
      setSelectedSnoozeType({
        key: data.value,
        text: data.value,
        value: data.value
      });
    }
  }

  return (
    <Form>
      <h1 className="title">Sleep Calculator</h1>
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
          options={snoozeTimeOptions}
        />
      </Form.Field>
      <Button primary>Calculate Snooze Times</Button>
    </Form>
  );
}

export default App;
