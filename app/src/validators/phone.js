import { isValidPhoneNumber } from 'react-phone-number-input';

export const checkPhoneNumber = (number, message = 'Please enter a valid phone number') => {
  if (!isValidPhoneNumber(number)) throw new Error(message);
};
