import React from 'react';

// square element
class Square extends React.Component {
  render() {
    return <button className="square" onClick={ () => this.props.onClick()}>{this.props.value}</button>;
  }
}

export default Square;
