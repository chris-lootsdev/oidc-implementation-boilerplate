export const mustBeNumber = value => (value && isNaN(value) ? 'Must be a number' : undefined);

export const required = value => value ? undefined : 'Required';

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const getComposedValidators = ({isRequired, validators}) => isRequired && validators ?
    composeValidators(required, ...validators) :
        isRequired ? required :
        validators ? composeValidators(...validators) :
        undefined;
