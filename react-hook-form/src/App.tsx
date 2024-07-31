import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IOption, IShippingFields } from './app.interface';
import ReactSelect from 'react-select';

const options: IOption[] = [
  {
    value: 'russia',
    label: 'Russia',
  },
  {
    value: 'china',
    label: 'China',
  },
  {
    value: 'usa',
    label: 'USA',
  },
  {
    value: 'new-zeeland',
    label: 'New-zeeland',
  },
];

const getValue = (value: string) =>            //инициализация селекта
    value ? options.find((option) => option.value === value) : '';
  

function App() {
  const {
    register, //register позволяет приконектить поле к форме, но с select он не сработает, сработает только с инпутами
    handleSubmit,
    formState: { errors },
    reset, //сбрасывает все поля в форме
    /* resetField('name') */ // сбрасывает какое-то конкретное поле
    /*  getValues,                //getValues и getFieldState получают текущие значения полей и инфу о полях, но не позволяют отслеживать изменения в полях
    getFieldState */
    watch, //позволяет отслеживать изменения в полях
    setValue, //позволяет изменить значение какого-либо поля
    control,
  } = useForm<IShippingFields>({
    /* defaultValues: {
      name: 'Ivan'
    }, */
    mode: 'onChange', //теперь ошибка выскакивает при каждом изменении поля пока оно не станет валидным
  });

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your counrty ${data.address.country}`);
    reset();
  };

  /* console.log('values: ', getValues('name'));
  console.log('firld state: ', getFieldState('name')); */

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]); //эффект срабатывает после изменения в каком-либо поле

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name', {
            required: 'Name is required field',
          })}
          placeholder="Name"
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
          placeholder="Email"
        />
        {errors?.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
        <Controller
          control={control}  //коннектим select с формой (register только для инпутов)
          name="address.country"        //значение, которое будем менять
          rules={{                            //валидация
            required: 'Country is require',
          }}
          render={({ field: { onChange/*чтобы менять поле*/, value /*чтобы получить текущее состояние*/ }, fieldState: { error } }) => (  //нужна для того, чтобы отрендерить список
            <div>
              <ReactSelect
                placeholder="Countries"
                options={options}
                value={getValue(value)}
                onChange={newValue => onChange((newValue as IOption).value)}
                //isMulti={true}        //можно выбирать множество элементов списка
              />
              {error && <div style={{ color: 'red' }}>{error.message}</div>}
            </div>
          )}
        />

        <div>
          <button>Send</button>
        </div>
      </form>
      <div>
        <button
          onClick={() => {
            setValue('name', 'Max');
            setValue('email', 'test@test.ru');
          }}>
          Fill data
        </button>
      </div>
    </div>
  );
}

export default App;
