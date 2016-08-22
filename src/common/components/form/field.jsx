import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';

export default class FormField extends Component {
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
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    placeholder: '',
    type: 'text',
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
      onBlur,
      onChange,
      onFocus,
      placeholder,
      type,
      value,
    } = this.props;

    const formProps = {
      onBlur,
      onChange,
      onFocus,
      value,
    };

    return (
      <FormGroup
        controlId={this.getControlId()}
        validationState={this.getValidationState()}
      >
        {label ? (
          <ControlLabel>
            {label}
          </ControlLabel>
        ) : null}
        <FormControl
          type={type}
          placeholder={placeholder}
          {...formProps}
        />
        {error ? (
          <HelpBlock>
            {error}
          </HelpBlock>
        ) : null}
      </FormGroup>
    );
  }
}
