import React, {
  Component,
  PropTypes,
} from 'react';

import DevTools from 'components/DevTools';
import Header from 'containers/Header';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  componentWillMount() {
    this.setState({ isMounted: false });
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
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
      <div>
        <Header />
        <main>
          {this.state.isMounted && <DevTools />}
          {children}
        </main>
      </div>
    );
  }
}
