import React, {
  PropTypes,
} from 'react';

// import {
//   FormattedNumber,
// } from 'react-intl';

const LoadTransaction = ({
  // amount,
  // currency,
  date,
  description,
  // dupeId,
  // id,
  // localAmount,
  // localCurrency,
}) => (
  <article>
    <summary>
      <h3>
        {description}
      </h3>
      <small>
        {date.toString()}
      </small>
    </summary>
    <div>
      {/* <FormattedNumber
        style="currency"
        currency={currency}
        value={amount}
      /> */}
    </div>
  </article>
);

LoadTransaction.propTypes = {
  amount: PropTypes.number,
  currency: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  dupeId: PropTypes.string,
  id: PropTypes.string,
  localAmount: PropTypes.number,
  localCurrency: PropTypes.string,
};

export default LoadTransaction;
