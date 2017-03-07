import React from 'react';

class App extends React.Component {
  render() {
    let txt = this.props.txt
    return (
      <div>
        <h1>ToDo List</h1>
        <p>{txt}</p>
      </div>
    )
  }
}

//const App = () => <h1>Stateless component</h1>

export default App
