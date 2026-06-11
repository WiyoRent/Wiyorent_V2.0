import { isValidPhoneNumber } from 'react-phone-number-input';

// Throws if the phone number isn't valid for its country code - used to
// validate the contact number on the profile/onboarding form before submitting
export const checkPhoneNumber = (number, message = 'Please enter a valid phone number') => {
  if (!isValidPhoneNumber(number)) throw new Error(message);
};
