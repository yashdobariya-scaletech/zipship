import { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CollapseBox from '../../../shared/components/collapseBox/collapseBox';
import ErrorMessage from '../../../shared/components/errorBoundary/errorMessage';
import { InputSelect } from '../../../shared/components/inputSelect/inputSelect';
import { PersonInformation } from '../../../shared/enum/enum';
import {
  ClientOptions,
  CountryOptions,
  ItemsPieceProps,
  ParcelTypeOptions,
  ServiceTypeOptions,
  StateOptions,
} from '../../constant/constant';
import { FormInputField } from './formInputField';

interface IFormInput {
  Pickup_Address1: string;
  Pickup_Company: string;
  requestedDate: Date;
  Pickup_Email: string;
  Pickup_Phone: string;
  itemsName: string;
  Delivery_Address1: string;
  deliverContactName: string;
  deliverLocation: string;
  Delivery_Email: string;
  Delivery_Phone: string;
  client: DropDownProps;
  serviceType: DropDownProps;
  ParcelType: DropDownProps;
  referenceNumber: string;
  Pickup_City: string;
  Pickup_PostalZip: number;
  Pickup_ProvState: DropDownProps;
  Pickup_Country: DropDownProps;
  Delivery_City: string;
  Delivery_PostalZip: number;
  Delivery_ProvState: DropDownProps;
  Delivery_Country: DropDownProps;
  Delivery_Company: string;
  items: ItemsPieceProps[];
  attention: string;
  detailDescription: string;
}

interface DropDownProps {
  label: string;
  value: string;
}

const DataForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      items: [
        {
          NumberOfPieces: null,
          Weight: null,
          Height: null,
          Width: null,
          Length: null,
          description: '',
          price: null,
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray({ control, name: 'items' });

  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log('Data', data);

  const [sectionExpand, setSectionExpand] = useState(
    PersonInformation.ClientDetails as string
  );

  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    setValue('referenceNumber', randomString);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex--column basic-form container">
        <h1 className="order-heading font--bold font-size--32 line-height--48 text--center mb--24">
          Delivery Site
        </h1>
        <div className="detail-wrapper border--grey-500 mb--24 padding--16">
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={'Client Details'}
          >
            <div className="flex align-items--center justify-content--between mt--5">
              <div className="form-item width--full mr--15">
                <Controller
                  name="client"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    console.log('value:', value);
                    return (
                      <InputSelect
                        label="Client"
                        fieldName="client"
                        onChange={onChange}
                        options={ClientOptions}
                        selectedValue={value}
                      />
                    );
                  }}
                />
                {errors.client && (
                  <ErrorMessage name={'Please add date and time'} />
                )}
              </div>
              <div className="form-item width--full">
                <Controller
                  name="serviceType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputSelect
                      label="Service Type"
                      fieldName="serviceType"
                      onChange={onChange}
                      options={ServiceTypeOptions}
                      selectedValue={value}
                    />
                  )}
                />
                {errors.serviceType && (
                  <ErrorMessage name={'Please add date and time'} />
                )}
              </div>
            </div>
            <div className="form-item">
              <Controller
                name="requestedDate"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <p className="mb--5 font--bold">Date And Time</p>
                    <DatePicker
                      placeholderText="Requested Date"
                      className="width--full form__input"
                      minDate={new Date()}
                      showMonthDropdown
                      dateFormat="yyyy/MM/dd"
                      onChange={onChange}
                      selected={value}
                    />
                  </>
                )}
              />
              {errors.requestedDate && (
                <ErrorMessage name={'Please add date and time'} />
              )}
            </div>
            <div className="form-item">
              <p className="font--bold mb--5">Description</p>
              <input
                type="text"
                className="form__input"
                title="Description"
                {...register('detailDescription')}
                name="detailDescription"
                placeholder="Description"
              />
            </div>
            <div className="form-item">
              <Controller
                name="ParcelType"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Parcel Type"
                    fieldName="ParcelType"
                    onChange={onChange}
                    options={ParcelTypeOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.ParcelType && (
                <ErrorMessage name={'Please add date and time'} />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Shipment Reference Number</p>
              <Controller
                name="referenceNumber"
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <div className="reference-number flex align-items--center">
                    <input
                      className="form__input"
                      readOnly
                      {...register('referenceNumber')}
                      name="referenceNumber"
                      placeholder="Shipment Reference Number"
                    />
                    <button
                      type="button"
                      className="ml--20 form__submit font--bold text--white"
                      onClick={() => generateRandomString(15)}
                    >
                      Random No.
                    </button>
                  </div>
                )}
              />

              {errors.referenceNumber && (
                <ErrorMessage name="Reference number is required" />
              )}
            </div>
            <div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="multi-items flex align-items--center justify-content--between  mt--10"
                >
                  <div className="piece mr--15">
                    <div className="form-item flex align-items--center justify-content--between mt--5">
                      <div className="width--full mr--15">
                        <p className="font--bold mb--5">Description</p>
                        <input
                          type="text"
                          className="form__input mb--5"
                          placeholder="Description"
                          key={field.id}
                          {...register(`items.${index}.description`)}
                        />
                      </div>
                      <div className="width--full mr--15">
                        <p className="font--bold mb--5">Piece</p>
                        <input
                          type="number"
                          className="form__input mb--5"
                          placeholder="Pieces"
                          key={field.id}
                          {...register(`items.${index}.NumberOfPieces`)}
                        />
                      </div>
                    </div>
                    <div className="form-item flex align-items--center justify-content--between mt--5">
                      <div className="width--full mr--15">
                        <p className="font--bold mb--5">Weight</p>
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Weight"
                          key={field.id}
                          {...register(`items.${index}.Weight`)}
                        />
                      </div>
                      <div className="width--full">
                        <p className="font--bold mb--5">Price</p>
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Price"
                          key={field.id}
                          {...register(`items.${index}.price`)}
                        />
                      </div>
                    </div>
                    <div className="form-item flex align-items--center justify-content--between mt--5">
                      <div className="width--full mr--15">
                        <p className="font--bold mb--5">Length</p>
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Length"
                          key={field.id}
                          {...register(`items.${index}.Length`)}
                        />
                      </div>
                      <div className="width--full mr--15">
                        <p className="font--bold mb--5">Width</p>
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Width"
                          key={field.id}
                          {...register(`items.${index}.Width`)}
                        />
                      </div>
                      <div className="width--full">
                        <p className="font--bold mb--5">Height</p>
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Height"
                          key={field.id}
                          {...register(`items.${index}.Height`)}
                        />
                      </div>
                    </div>
                  </div>
                  {index > 0 && (
                    <div>
                      <button
                        type="button"
                        className="remove__btn font--bold text--white"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-item__btn font--bold text--white"
                onClick={() =>
                  append({
                    NumberOfPieces: null,
                    Weight: null,
                    Height: null,
                    Width: null,
                    Length: null,
                    description: '',
                    price: null,
                  })
                }
              >
                Add Item
              </button>
            </div>
          </CollapseBox>
        </div>
        <div className="sender-wrapper border--grey-500 mb--24 padding--16">
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={'Sender Information'}
          >
            {/* <div className="form-item mt--5">
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
            </div> */}
            <div className="form-item mt--5">
              <FormInputField
                type="text"
                title="Company"
                register={register}
                name="Pickup_Company"
                placeholder="Company"
              />
              {errors.Pickup_Company && (
                <ErrorMessage name="Company name is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="Address"
                register={register}
                name="Pickup_Address1"
                placeholder="Address"
              />
              {errors.Pickup_Address1 && (
                <ErrorMessage name="Address is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="City"
                register={register}
                name="Pickup_City"
                placeholder="City"
              />
              {errors.Pickup_City && <ErrorMessage name="City is required" />}
            </div>
            <div className="form-item">
              <FormInputField
                type="number"
                title="Postal Code/ZIP"
                register={register}
                name="Pickup_PostalZip"
                placeholder="Postal Code/ZIP"
              />
              {errors.Pickup_PostalZip && (
                <ErrorMessage name="Zip code number is required" />
              )}
            </div>
            <div className="form-item mt--5">
              <Controller
                name="Pickup_ProvState"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Province/State"
                    fieldName="Pickup_ProvState"
                    onChange={onChange}
                    options={StateOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.Pickup_ProvState && (
                <ErrorMessage name={'State is required'} />
              )}
            </div>
            <div className="form-item mt--5">
              <Controller
                name="Pickup_Country"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Country"
                    fieldName="Pickup_Country"
                    onChange={onChange}
                    options={CountryOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.Pickup_Country && (
                <ErrorMessage name={'Country is required'} />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Phone</p>
              <Controller
                name="Pickup_Phone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className="form__input"
                    defaultCountry="US"
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.Pickup_Phone && (
                <ErrorMessage name="Phone number is required" />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Email</p>
              <input
                type="email"
                className="form__input"
                placeholder="Sender Email"
                {...register('Pickup_Email', {
                  required: false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.Pickup_Email?.message && (
                <ErrorMessage name={errors.Pickup_Email?.message} />
              )}
            </div>
          </CollapseBox>
        </div>
        <div className="deliver-wrapper border--grey-500 padding--16 mb--24">
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={'Delivery Information'}
          >
            <div className="flex align-items--center justify-content--between">
              <div className="form-item mt--5 mr--15 width--full">
                <FormInputField
                  type="text"
                  title="Name Or Company Name"
                  register={register}
                  name="Delivery_Company"
                  placeholder="Name Or Company Name"
                />
                {errors.Delivery_Company && (
                  <ErrorMessage name="Company name is required" />
                )}
              </div>
              <div className="form-item mt--5 width--full">
                <p className="font--bold mb--5">Attention</p>
                <input
                  type="text"
                  className="form__input"
                  title="Attention"
                  {...register('attention')}
                  name="attention"
                  placeholder="Attention"
                />
              </div>
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="Address"
                register={register}
                name="Delivery_Address1"
                placeholder="Address"
              />
              {errors.Delivery_Address1 && (
                <ErrorMessage name="Address is required" />
              )}
            </div>
            <div className="form-item">
              <FormInputField
                type="text"
                title="City"
                register={register}
                name="Delivery_City"
                placeholder="City"
              />
              {errors.Delivery_City && <ErrorMessage name="City is required" />}
            </div>
            <div className="form-item">
              <FormInputField
                type="number"
                title="Postal Code/ZIP"
                register={register}
                name="Delivery_PostalZip"
                placeholder="Postal Code/ZIP"
              />
              {errors.Delivery_PostalZip && (
                <ErrorMessage name="Zip code number is required" />
              )}
            </div>
            <div className="form-item mt--5">
              <Controller
                name="Delivery_ProvState"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="State"
                    fieldName="Delivery_ProvState"
                    onChange={onChange}
                    options={StateOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.Delivery_ProvState && (
                <ErrorMessage name={'State is required'} />
              )}
            </div>
            <div className="form-item mt--5">
              <Controller
                name="Delivery_Country"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label="Country"
                    fieldName="Delivery_Country"
                    onChange={onChange}
                    options={CountryOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.Delivery_Country && (
                <ErrorMessage name={'Country is required'} />
              )}
            </div>
            <div className="form-item">
              <p className="mb--5 font--bold">Email</p>
              <input
                type="email"
                className="form__input"
                placeholder="Deliver Email"
                {...register('Delivery_Email', {
                  required: false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.Delivery_Email?.message && (
                <ErrorMessage name={errors.Delivery_Email?.message} />
              )}
            </div>
            {/* <div className="form-item">
              <Controller
                name="deliverDateAndTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <p className="mb--5 font--bold">Date And Time</p>
                    <DateTimePicker className={"width--full"} {...field} />
                  </>
                )}
              />
              {errors.deliverDateAndTime && <ErrorMessage name={"Please add date and time"} />}
            </div> */}
            <div className="form-item">
              <p className="mb--5 font--bold">Phone Number</p>
              <Controller
                name="Delivery_Phone"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className="form__input"
                    defaultCountry="US"
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.Delivery_Phone && (
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
        <div className="form-item mb--20">
          <button className="form__submit font--bold text--white" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default DataForm;
