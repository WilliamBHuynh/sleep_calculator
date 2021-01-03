import React, { useState, SyntheticEvent } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import moment from 'moment';
import './index.css'

export const SnoozeComponents = (props: any) => {

    // returns if the timeValue is earlier than the endLimit and later than the lastValue
    const isEarlierThanEndLimit = (timeValue: string, endLimit: string, lastValue: string) => {
        const timeValueIsEarlier = moment(timeValue, 'h:mmA').diff(moment(endLimit, 'h:mmA')) < 0;
        const timeValueIsLaterThanLastValue = lastValue === "" ? true : moment(lastValue, 'h:mmA').diff(moment(timeValue, 'h:mmA')) < 0;
        return timeValueIsEarlier && timeValueIsLaterThanLastValue;
    }

    // defining the time attributes
    let timeValue = "12:00AM";
    let lastValue = "";
    const endLimit = "11:59PM";
    const step = 30;

    const snoozeTimeOptions = [{ key: timeValue, text: timeValue, value: timeValue }];

    // populate the times from the timeValue to the endLimit
    while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
        lastValue = timeValue;
        timeValue = moment(timeValue, 'h:mmA').add(step, 'minutes').format('h:mmA');
        snoozeTimeOptions.push({ key: timeValue, text: timeValue, value: timeValue });
    }
    snoozeTimeOptions.pop();

    // hook for selected snooze time from dropdown
    const [selectedSnoozeTime, setSelectedSnoozeTime] = useState(snoozeTimeOptions[17]);

    const handleSnoozeTimeChange = (event: SyntheticEvent<HTMLElement>, data: any) => {
        setSelectedSnoozeTime({
            key: data.value,
            text: data.value,
            value: data.value
        });
    }

    // values for snooze type dropdown
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

    // hook for snooze time dropdown
    const [selectedSnoozeType, setSelectedSnoozeType] = useState(snoozeTypeOptions[0]);

    const handleSnoozeTypeChange = (event: SyntheticEvent<HTMLElement>, data: any) => {
        setSelectedSnoozeType({
            key: data.value,
            text: data.value,
            value: data.value
        });
    }

    // description text for input screen
    const SnoozeInputText: React.FC = () => {
        return (
            <label>
                Find out when you should
                <span className='highlight'> sleep </span>
                    or
                <span className='highlight'> wake up </span>
                    by to get that good night’s sleep!
            </label>
        );
    }

    // drop down components for input screen
    const SnoozeInputComponents: React.FC = () => {
        return (
            <div>
                <div className='textPadding'><SnoozeInputText /></div>
                <div className='dropdown'>
                    <Dropdown
                        fluid
                        selection
                        value={selectedSnoozeType.value}
                        options={snoozeTypeOptions}
                        onChange={handleSnoozeTypeChange}
                    />
                </div>
                <div className='dropdown'>
                    <Dropdown
                        fluid
                        selection
                        value={selectedSnoozeTime.value}
                        options={snoozeTimeOptions}
                        onChange={handleSnoozeTimeChange}
                    />
                </div>
            </div>
        );
    }

    // description text for output screen depending on snooze type
    const SnoozeOutputText: React.FC = () => {
        if (selectedSnoozeType.value.includes('wake')) {
            return (
                <label>
                    To wake up refreshed at
                    <span className='highlight'> {selectedSnoozeTime.value}</span>
                    , I need to fall asleep at one of these times:
                </label>
            );
        }
        return (
            <label>
                To sleep at
                <span className='highlight'> {selectedSnoozeTime.value}</span>
                , you should wake up at these times to feel refreshed:
            </label>
        );
    }

    // grid component for snooze time output
    const SnoozeOutputComponents: React.FC = () => {
        // Calculate snooze times based on inputted time
        const snoozeTimes = [];
        const sleepCycleStep = 90;
        const tempSelectedTime = moment(selectedSnoozeTime.value, 'h:mmA');

        for (let i = 1; i < 7; i++) {
            if (selectedSnoozeType.value.includes('wake')) {
                // calculate wake up times
                snoozeTimes.push(moment(tempSelectedTime, 'h:mmA').subtract(sleepCycleStep * (i), "minutes").format('h:mmA'));
            } else {
                // calculate sleep by times
                snoozeTimes.push(moment(tempSelectedTime, 'h:mmA').add(sleepCycleStep * (i), "minutes").format('h:mmA'));
            }
        }

        // display grid of resulting snooze times
        return (
            <div>
                <div className='textPadding'><SnoozeOutputText /></div>
                <div className='gridPadding'>
                    <div className='ui one column stackable center aligned page grid'>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <label className='highlight'>{snoozeTimes[5]}</label>
                                </Grid.Column>
                                <Grid.Column>
                                    <label className='highlight'>{snoozeTimes[4]}</label>
                                </Grid.Column>
                                <Grid.Column>
                                    {snoozeTimes[3]}
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    {snoozeTimes[2]}
                                </Grid.Column>
                                <Grid.Column>
                                    {snoozeTimes[1]}
                                </Grid.Column>
                                <Grid.Column>
                                    {snoozeTimes[0]}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }

    const isSubmitted: boolean = props.isSubmitted;
    if (!isSubmitted) {
        return <SnoozeInputComponents />
    }
    return <SnoozeOutputComponents />;
}