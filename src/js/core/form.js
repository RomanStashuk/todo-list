class Form {
  constructor(form, controls) {
    this.form = form;
    this.controls = controls;
  }

  value() {
    const value = {};

    Object.keys(this.controls).forEach((control) => {
      value[control] = this.form[control].value;
    });

    return value;
  }

  isValid() {
    let isFormValid = true;

    Object.keys(this.controls).forEach((control) => {
      const validators = this.controls[control];
      let isValid = true;

      validators.forEach((validator) => {
        isValid = validator(this.form[control].value) && isValid;
      });

      isValid ? clearError(this.form[control]) : setError(this.form[control]);

      isFormValid = isFormValid && isValid;
    });

    return isFormValid;
  }

  clear() {
    Object.keys(this.controls).forEach((control) => {
      this.form[control].value = '';
    });
  }
}

function setError($control) {
  clearError($control);
  const error = '<p class="form__validation-error">Invalid value</p>';
  $control.classList.add('form__control--invalid');
  $control.insertAdjacentHTML('afterend', error);
}

function clearError($control) {
  $control.classList.remove('form__control--invalid');

  if ($control.nextSibling) {
    $control.closest('.form__control').removeChild($control.nextSibling);
  }
}

export default Form;
