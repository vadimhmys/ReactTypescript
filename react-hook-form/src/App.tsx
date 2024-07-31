import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShippingFields } from './app.interface';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,                       //сбрасывает все поля в форме
    /* resetField('name') */     // сбрасывает какое-то конкретное поле
   /*  getValues,                //getValues и getFieldState не позволяют отслеживать изменения в полях
    getFieldState */ 
    watch                        //позволяет отслеживать изменения в полях
  } = useForm<IShippingFields>({
    /* defaultValues: {
      name: 'Ivan'
    }, */
    mode: 'onChange'             //теперь ошибка выскакивает при каждом изменении поля пока оно не станет валидным
  });

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.name}`);
    reset();
  };

  /* console.log('values: ', getValues('name'));
  console.log('firld state: ', getFieldState('name')); */

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])                    //эффект срабатывает после изменения в каком-либо поле

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', {
            required: 'Name is required field',
          })}
          placeholder='Name'
        />
        {errors?.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
        <input
          {...register('email', {
            required: 'Email is required field',
            pattern: {
              value: /.+@.+\..+/i,
              message: 'Please enter valid email',
            },
          })}
          placeholder='Email'
        />
        {errors?.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
