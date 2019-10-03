import React from 'react';
import ScoresHeaderRow from './ScoresHeaderRow';
const Fragment = React.Fragment;

const ScoresHeader = (props) => {
  let testNames = [];
  let testAverages = [];
  let testDates = [];

  props.header.map((item) => {
    console.log(item);
    testNames.push(item['name']);
    testAverages.push(Math.round(item['average']));
    testDates.push(item['date']);
  });
  
  return (
    <Fragment>
      <tr>
        <ScoresHeaderRow items={testNames} />
      </tr>
      <tr>
        <ScoresHeaderRow items={testAverages} />
      </tr>
      <tr>
        <ScoresHeaderRow items={testDates} />
      </tr>
    </Fragment>
  )
}

export default ScoresHeader;