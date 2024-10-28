import React, { useContext, useState, useRef } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import AppContext from '../context/AppContext';

function AddQuestion() {
  const [error, setError] = useState(null);
  const [attempted, setAttempted] = useState(false);
  const {
    store: { product }, productID, hideModal, updateQnA,
  } = useContext(AppContext);

  const formRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttempted(true);
 
    const data = Object.fromEntries(new FormData(e.target.form));
    data.product_id = parseInt(data.product_id);
    
    const response = await axios.post('/qa/questions', data);
    if (response.status === 201) {
      updateQnA();
      hideModal();
    }
  };

  const validate = (e) => {
    if (formRef.current && formRef.current.checkValidity()) {
      setError(null);
      return;
    }
    const errors = {};
    if (!e.target.form.body.validity.valid) {
      errors.body = 'A question';
    }
    if (!e.target.form.name.validity.valid) {
      errors.name = 'Your name';
    }
    if (!e.target.form.email.validity.valid) {
      errors.email = 'A valid email address';
    }
    setError(errors);
  };

  return (
    <div className="bg-base-100 text-base-content p-6 flex flex-col gap-4 relative">
      <div>
        <h1 className="text-3xl font-bold">Ask Your Question</h1>
        <h2>{`About the ${product.name}`}</h2>
      </div>
      <form className="flex flex-col gap-4" ref={formRef}>
        <label htmlFor="body" className="flex flex-col w-full">
          Your Question*
          <textarea className="form-input resize-none" name="body" placeholder="Why did you like the product or not?" maxLength={1000} rows={3} required onChange={validate} />
        </label>
        <label htmlFor="name" className="flex flex-col w-full">
          What is your nickname*
          <input type="text" name="name" placeholder="Example: jackson11!" className="form-input" maxLength={60} required onChange={validate} />
          <p className="text-sm text-neutral-400">For privacy reasons, do not use your full name or email address</p>
        </label>
        <label htmlFor="email" className="flex flex-col w-full">
          Your email*
          <input type="email" name="email" placeholder="Example: jackson@email.com" className="form-input" maxLength={60} required onChange={validate} />
          <p className="text-sm text-neutral-400">For authentication reasons, you will not be emailed</p>
        </label>
        <input type="hidden" name="product_id" value={productID} />
        {error && attempted ? (
          <ul className="flex flex-col text-red-500">
            <li>You must enter the following:</li>
            {Object.values(error).map((err) => <li>{err}</li>)}
          </ul>
        ) : null}
        <button type="button" onClick={handleSubmit} className="form-input">Submit Question</button>
      </form>
      <button aria-label="close" className="absolute right-4 top-4" onClick={hideModal}><IoClose size={32} /></button>
    </div>
  );
}

export default AddQuestion;
