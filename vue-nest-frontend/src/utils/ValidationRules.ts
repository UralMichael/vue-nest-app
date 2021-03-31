import { InputValidationRule } from "vuetify";

export const Required = (value: any) => !!value || "Required field.";

export const MinLength = (minLength: number) => {
  return (value: any) =>
    value.length >= minLength || `Min length is ` + minLength;
};

export const MaxLength = (maxLength: number) => {
  return (value: any) =>
    value.length <= maxLength || `Max length is ` + maxLength;
};

export const LettersNumberLowercase: InputValidationRule = (value: any) => {
  const pattern = /^[a-zA-Z0-9_]*$/;
  return pattern.test(value) || "Only letters, numbers and lowercase allowed.";
};

export const HasLetter: InputValidationRule = (value: string) => {
  const pattern = /[a-zA-Z]/;
  return pattern.test(value) || "Must be at least one letter.";
};

export const Email: InputValidationRule = (value: string) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(value) || "Invalid Email.";
};

export const Password: InputValidationRule = (value: string) => {
  const pattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return pattern.test(value) || "Password is weak";
};

export const UsernameRules: InputValidationRule[] = [
  LettersNumberLowercase,
  HasLetter,
  MinLength(4),
  MaxLength(64),
];
