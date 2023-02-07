import React from "react";
import { Text } from "@react-native-material/core";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(_error, _info) {
    this.setState({hasError: true});
  }

  render() {
    if(this.state.hasError) return <Text>Error!</Text>;
    return this.props.children;
  }
}

