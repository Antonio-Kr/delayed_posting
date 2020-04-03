import {
  registerDecorator,
  ValidatorOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsPasswordValidConstraint implements ValidatorConstraintInterface {
  validate(password: any, args: ValidationArguments) {
    return /^^(?=.*[0-9])(?=.*[\w])(?=.*[\W])[\d\W\w\s]{6,}$$/.test(password);
  }
}

export function IsPasswordValid(validationOptions?: ValidatorOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordValidConstraint,
    });
  };
}
