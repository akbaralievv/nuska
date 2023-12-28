import React, { useState, useCallback } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import styles from './Payment.module.css';

export default function PaymentForm() {
  const [state, setState] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const [errors, setErrors] = useState({
    cvc: null,
    expiry: null,
    name: null,
    number: null,
  });

  const handleInputFocus = useCallback(
    (e) => {
      setState({ ...state, focus: e.target.name });
    },
    [state],
  );

  const validateNumber = (number) => {
    return number.replace(/\D/g, '');
  };

  const validateName = (name) => {
    return name.replace(/[^a-zA-Z\s]/g, '');
  };

  const validateExpiry = (expiry) => {
    return expiry.replace(/\D/g, '').slice(0, 4);
  };

  const validateCVC = (cvc) => {
    return cvc.replace(/\D/g, '').slice(0, 4);
  };

  const validateInput = useCallback(
    (name, value) => {
      let errorMessage = null;
      switch (name) {
        case 'number':
          if (value && !/^\d{0,16}$/.test(value)) {
            errorMessage = 'Invalid card number';
          }
          break;
        case 'name':
          if (value && !/^[a-zA-Z\s]*$/.test(value)) {
            errorMessage = 'Invalid name';
          }
          break;
        case 'expiry':
          if (value && !/^\d{0,4}$/.test(value)) {
            errorMessage = 'Invalid date';
          }
          break;
        case 'cvc':
          if (value && !/^\d{0,4}$/.test(value)) {
            errorMessage = 'Invalid CVC';
          }
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: errorMessage });
    },
    [errors],
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      validateInput(name, value);
      let validatedValue = value;
      switch (name) {
        case 'number':
          validatedValue = validateNumber(value);
          break;
        case 'name':
          validatedValue = validateName(value);
          break;
        case 'expiry':
          validatedValue = validateExpiry(value);
          break;
        case 'cvc':
          validatedValue = validateCVC(value);
          break;
        default:
          break;
      }
      setState({ ...state, [name]: validatedValue });
    },
    [state],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors && state.cvc && state.name && state.number && state.expiry) {
      console.log('Form submitted:', state);
      //API-запрос
    } else {
      console.log('Errors present. Cannot submit form.');
    }
  };

  return (
    <div className={styles.container}>
      <div id="PaymentForm">
        <Cards
          rccsSize={'500px'}
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
          className={styles.cardImg}
        />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={16}
            />
            {errors.number && <span className={styles.error}>{errors.number}</span>}
          </div>
          <div className={styles.input}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={30}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.dateCVC}>
            <div className={styles.input}>
              <input
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
              />
              {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
            </div>
            <div className={styles.input}>
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={4}
              />
              {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
            </div>
          </div>
          <button type="submit" className={styles.btnSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
