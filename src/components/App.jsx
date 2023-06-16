import { Section } from './Section/Section';
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Notification } from "./Notification/Notification";
import { useState } from 'react';

const options = ['good', 'neutral', 'bad'];

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const onLeaveFeedback = e => {
    const { name } = e.currentTarget;

    switch (name) {
      case 'good':
        setGood(good => good + 1);
        break;
      
      case 'neutral':
        setNeutral(neutral => neutral + 1);
        break;
      
      case 'bad':
        setBad(bad => bad + 1);
        break;
      
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad
  }
  
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  }

    return (
      <>
      <Section title='Please leave feedback'>
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onLeaveFeedback}>
        </FeedbackOptions>
        </Section>
        {
          countTotalFeedback()
            ? <Section title='Statistics'>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}>
              </Statistics>
            </Section>
          : <Notification message="There is no feedback" />
        }
        </>
)};