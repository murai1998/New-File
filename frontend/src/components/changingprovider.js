import React from "react";

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 50
  };

  state = {
    valuesIndex: 0
  };

  componentDidMount() {
    const id = setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
      });
      if (
        this.state.valuesIndex ==
        this.props.values[this.props.values.length - 1]
      )
        clearInterval(id);
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
