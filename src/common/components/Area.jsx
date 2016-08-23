import React, {
  PropTypes,
} from 'react';

const Area = ({
  children,
}) => (
  <div
    style={{
      position: 'relative',
      height: '100%',
    }}
  >
    {children}
  </div>
);

Area.propTypes = {
  children: PropTypes.any,
};

export default Area;
