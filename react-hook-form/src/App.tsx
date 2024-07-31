import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShippingFields } from './app.interface';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingFields>();

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.name}`);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', {
            required: 'Name is required field',
          })}
        />
        {errors?.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
        
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
