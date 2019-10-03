import React from 'react';

import ScoresRow from './ScoresRow';
import ScoresHeader from './ScoresHeader';

class Scores extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      tests: []
    }

  }

  // load data from the API
  componentDidMount() {
    fetch('http://localhost:3100/students/students')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        students: data
      })
    });

    fetch('http://localhost:3100/students/tests')
    .then(res => res.json())
    .then((data) => {
      this.setState({
        tests: data
      })
    });
    // console.log(this.state);
  }

  render() {
    if (this.state.students && this.state.tests) {
      return (
        <div>
          <table>
            <thead>
              <ScoresHeader header={this.state.tests} />
            </thead>
            <tbody>
              {this.state.students.map((item) => <ScoresRow average={item.average} firstName={item.FirstName} lastName={item.LastName} tests={item.tests} />)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          Scores are loading.
        </div>
      )
    }
  }
}
 export default Scores;