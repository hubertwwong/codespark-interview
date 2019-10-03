import React from 'react';
const Fragment = React.Fragment;

const ScoresRow = (props) => {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{Math.round(props.average)}</td>
      <Fragment>
      {
        Object.entries(props.tests).map((test) => {
          return <td>{test[1]}</td>
        })
      }
      </Fragment>
    </tr>
  )
}

export default ScoresRow;