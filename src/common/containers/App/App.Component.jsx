import React, {
  Component,
  PropTypes,
} from 'react';

import DevTools from 'components/DevTools';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  componentWillMount() {
    this.setState({ isMounted: false });
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      isMounted,
    } = this.state;

    return (
      <main>
        {this.state.isMounted && <DevTools />}
        {children}
      </main>
    )
  }
}
