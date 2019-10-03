import React from 'react';
const Fragment = React.Fragment;

const ScoresHeaderRow = (props) => {
  return (
    <Fragment>
      <th></th>
      <th></th>
      <th></th>
      {
        props.items.map((item) => {
          return <th>{item}</th>
        })
      }
    </Fragment>
  )
}

export default ScoresHeaderRow;
//               {this.state.tests.map((item) => <ScoresHeaderRow key={item.name} average={item.average} name={item.name} item={item} />)}
