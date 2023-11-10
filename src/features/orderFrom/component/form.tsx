import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CollapseBox from '../../../shared/components/collapseBox/collapseBox';
import ErrorMessage from '../../../shared/components/errorBoundary/errorMessage';
import { PersonInformation } from '../../../shared/enum/enum';
import { FormInputField } from './formInputField';

interface IFormInput {
  senderPlace: string;
  senderContactName: string;
  senderDateAndTime: Date;
  senderLocation: string;
  senderEmail: string;
  senderPhone: string;
  itemsName: string;
  deliverName: string;
  deliverContactName: string;
  deliverDateAndTime: Date;
  deliverLocation: string;
  deliverEmail: string;
  deliverPhone: string;
}
const DataForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const [sectionExpand, setSectionExpand] = useState(
    PersonInformation.SenderInformation as string
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex--column basic-form container">
        <h1 className="order-heading font--bold font-size--32 line-height--48 text--center mb--24">
          Delivery Site
        </h1>
        <div className="sender-wrapper border--grey-500 mb--24 padding--16">
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={'Sender Information'}
          >
            <div className="form-item mt--5">
              <FormInputField
                type="text"
                title="Place"
                register={register}
                name="senderPlace"
                placeholder="Sender Place"
              />
              {errors.senderPlace && (
                <ErrorMessage name="Sender place is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="Contact Name"
                register={register}
                name="senderContactName"
                placeholder="Contact Name"
              />
              {errors.senderContactName && (
                <ErrorMessage name="Contact name is required" />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Email</p>
              <input
                type="email"
                className="form__input"
                placeholder="Sender Email"
                {...register('senderEmail', {
                  required: 'Sender email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.senderEmail?.message && (
                <ErrorMessage name={errors.senderEmail?.message} />
              )}
            </div>
            <div className="form-item">
              <Controller
                name="senderDateAndTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <p className="mb--5 font--bold">Date And Time</p>
                    <DateTimePicker className={'width--full'} {...field} />
                  </>
                )}
              />
              {errors.senderDateAndTime && (
                <ErrorMessage name={'Please add date and time'} />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Phone Number</p>
              <Controller
                name="senderPhone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className="form__input"
                    defaultCountry="US"
                    specialLabel={''}
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.senderPhone && (
                <ErrorMessage name="Phone number is required" />
              )}
            </div>

            <div className="form-item">
              <FormInputField
                type="text"
                title="Items Name"
                register={register}
                name="itemsName"
                placeholder="Items Name"
              />
              {errors.itemsName && (
                <ErrorMessage name="Items name is required" />
              )}
            </div>
          </CollapseBox>
        </div>
        <div className="deliver-wrapper border--grey-500 padding--16 mb--24">
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={'Deliver Information'}
          >
            <div className="form-item mt--5">
              <FormInputField
                type="text"
                title="Name"
                register={register}
                name="deliverName"
                placeholder="Deliver Name"
              />
              {errors.deliverName && (
                <ErrorMessage name="Deliver name is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="Contact Name"
                register={register}
                name="deliverContactName"
                placeholder="Contact Name"
              />
              {errors.deliverContactName && (
                <ErrorMessage name="Contact name is required" />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Email</p>
              <input
                type="email"
                className="form__input"
                placeholder="Deliver Email"
                {...register('deliverEmail', {
                  required: 'Deliver email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.deliverEmail?.message && (
                <ErrorMessage name={errors.deliverEmail?.message} />
              )}
            </div>
            <div className="form-item">
              <Controller
                name="deliverDateAndTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <p className="mb--5 font--bold">Date And Time</p>
                    <DateTimePicker className={'width--full'} {...field} />
                  </>
                )}
              />
              {errors.deliverDateAndTime && (
                <ErrorMessage name={'Please add date and time'} />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Phone Number</p>
              <Controller
                name="deliverPhone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className="form__input"
                    defaultCountry="US"
                    specialLabel={''}
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.deliverPhone && (
                <ErrorMessage name="Phone number is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="Location"
                register={register}
                name="deliverLocation"
                placeholder="Deliver Location"
              />
              {errors.deliverLocation && (
                <ErrorMessage name="Location is required" />
              )}
            </div>
          </CollapseBox>
        </div>
        <div className="form-item">
          <button className="form__submit font--bold text--white" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};
export default DataForm;
