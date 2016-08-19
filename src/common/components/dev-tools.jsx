import React from 'react';

import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

import {
  createDevTools,
} from 'redux-devtools';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
    defaultIsVisible={false}
    defaultPosition="right"
    defaultSize={350}
    fluid={false}
  >
    <LogMonitor />
  </DockMonitor>
);

export default DevTools;
