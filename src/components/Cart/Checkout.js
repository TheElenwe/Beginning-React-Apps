// import { useRef, useState } from "react";
import { useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHanlder,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHanlder,
    inputBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHanlder,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHanlder,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const hasErrorName = !enteredName && formInputsValidity;
  const hasErrorStreet = !enteredStreet && formInputsValidity;
  const hasErrorPostalCode = !enteredPostalCode && formInputsValidity;
  const hasErrorCity = !enteredCity && formInputsValidity;

  const hasErrorValidityName = !hasErrorName && nameInputHasError; // Οταν πατας submit να βγαζει error και οταν κανω blur να βγαζει το ιδιο error π.χ το paragraph//
  const hasErrorValidityStreet = !hasErrorStreet && streetInputHasError;
  const hasErrorValidityPostalCode =
    !hasErrorPostalCode && postalCodeInputHasError;
  const hasErrorValidityCity = !hasErrorCity && cityInputHasError;

  const nameErrorValid = hasErrorValidityName || hasErrorName;
  const sreetErrorValid = hasErrorValidityStreet || hasErrorStreet;
  const postalCodeErrorValid = hasErrorValidityPostalCode || hasErrorPostalCode;
  const cityErrorValid = hasErrorValidityCity || hasErrorStreet;

  const confirmHandler = (event) => {
    event.preventDefault();
    setFormInputsValidity(true);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !nameInputHasError ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    !streetInputHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeInputHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityInputHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHanlder}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameErrorValid && <p className={classes.text}>name is not valid!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHanlder}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {sreetErrorValid && <p className={classes.text}>name is not valid!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHanlder}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeErrorValid && (
          <p className={classes.text}>name is not valid!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHanlder}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityErrorValid && <p className={classes.text}>name is not valid!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
