import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity,  setFormInputValidity] = useState({
        name: true,
        street: true,
        postalcode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enterNameIsValid = !isEmpty(enteredName); 
    const enterStreetIsValid = !isEmpty(enteredStreet);
    const enterPostalCodeIsValid = isFiveChar(enteredPostalCode);
    const enterCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name: enterNameIsValid,
        street: enterStreetIsValid,
        postalcode: enterPostalCodeIsValid,
        city: enterCityIsValid
    });

    const formIsValid = enterNameIsValid && enterStreetIsValid && enterPostalCodeIsValid && enterCityIsValid;

    if (!formIsValid) {
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalcode: enteredPostalCode,
        city: enteredCity
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalcode ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalcode && <p>Please enter a valid Postalcode!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;