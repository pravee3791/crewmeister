import React from "react";

export default class ErrorBoundary extends React.Component<{},{
    error:any
}> {
  constructor(props:any) {
    super(props);
    this.state = {error: ""};
  }

  componentDidCatch(error:any) {
    this.setState({error: `${error.name}: ${error.message}`});
  }

  render() {
    const {error} = this.state;
    if (error) {
      return (
        <div>{error}</div>
      );
    } else {
      return <>{this.props.children}</>;
    }
  }
}
