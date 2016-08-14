import React, {
  PropTypes,
} from 'react';

const Area = ({
  children,
}) => (
  <div>
    {children}
  </div>
);

Area.propTypes = {
  children: PropTypes.any,
};

export default Area;
