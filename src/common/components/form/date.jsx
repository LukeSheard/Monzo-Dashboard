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

import DatePicker from 'react-bootstrap-date-picker';

export default class DateField extends Component {
  static propTypes = {
    children: PropTypes.array,
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
  }

  static defaultProps = {
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
      error,
      label,
      // onBlur,
      // onChange,
      // onFocus,
      // placeholder,
      // value,
      // todayButton,
    } = this.props;

    // const formProps = {
    //   onBlur,
    //   onChange,
    //   onFocus,
    //   selected: value,
    //   placeholderText: placeholder,
    //   todayButton,
    // };

    return (
      <FormGroup
        controlId={this.getControlId()}
        validationState={this.getValidationState()}
      >
        <DatePicker
          className="form-control"
          onChange={(v) => {
            console.log('change');
            console.log(v);
            // onChange(v);
          }}
          onFocus={(v) => {
            console.log('focus');
            console.log(v);
            // onFocus(v);
          }}
          onBlur={(v) => {
            console.log('blur');
            console.log(v);
            // onBlur(v);
          }}
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
