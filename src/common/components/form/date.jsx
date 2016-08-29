import {
  isEmpty,
} from 'lodash/fp';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ControlLabel,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

import Moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateField extends Component {
  static propTypes = {
    children: PropTypes.array,
    dateFormat: PropTypes.string,
    error: PropTypes.string,
    invalid: PropTypes.bool,
    label: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    touched: PropTypes.bool,
    value: PropTypes.any.isRequired,
    todayButton: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    dateFormat: 'L',
    disabled: false,
    placeholder: '',
    value: new Moment(),
    todayButton: false,
  }

  constructor(props) {
    super(props);

    this.getControlId = this.getControlId.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  getControlId() {
    const {
      label,
      placeholder,
    } = this.props;

    return label || placeholder || String(Math.random()).slice(0, 5);
  }

  getValidationState() {
    const {
      error,
      invalid,
      touched,
    } = this.props;

    if (touched && invalid) {
      return error;
    }

    return undefined;
  }

  render() {
    const {
      disabled,
      error,
      dateFormat,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      value,
      todayButton,
    } = this.props;

    const formProps = {
      onBlur,
      onChange,
      onFocus,
      placeholderText: placeholder,
    };

    if (!isEmpty(value)) {
      formProps.selected = value;
    }

    if (todayButton) {
      formProps.todayButton = 'Today';
    }

    return (
      <FormGroup
        controlId={this.getControlId()}
        validationState={this.getValidationState()}
      >
        <DatePicker
          className="form-control"
          {...formProps}
          onBlur={(e) => {
            const blurredValue = new Moment(e.target.value, dateFormat);
            onBlur(blurredValue.isValid ? blurredValue : value);
          }}
          disabled={disabled}
        />
        {label ? (
          <ControlLabel>
            {label}
          </ControlLabel>
        ) : null}
        {error ? (
          <HelpBlock>
            {error}
          </HelpBlock>
        ) : null}
      </FormGroup>
    );
  }
}
