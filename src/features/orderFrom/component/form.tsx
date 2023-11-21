import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CollapseBox from "../../../shared/components/collapseBox/collapseBox";
import ErrorMessage from "../../../shared/components/errorBoundary/errorMessage";
import { InputSelect } from "../../../shared/components/inputSelect/inputSelect";
import { PersonInformation } from "../../../shared/enum/enum";
import {
  ClientOptions,
  CountryOptions,
  ItemsPieceProps,
  ParcelTypeOptions,
  ServiceTypeOptions,
  StateOptions,
} from "../../constant/constant";
import { FormInputField } from "./formInputField";

interface IFormInput {
  senderAddress: string;
  senderCompanyName: string;
  requestedDate: Date;
  senderLocation: string;
  senderEmail: string;
  senderPhone: string;
  itemsName: string;
  deliveryAddress: string;
  deliverContactName: string;
  // deliverDateAndTime: Date;
  deliverLocation: string;
  deliverEmail: string;
  deliverPhone: string;
  client: any;
  serviceType: any;
  parcelType: any;
  referenceNumber: string;
  senderCity: string;
  senderZipCode: number;
  senderState: any;
  senderCountry: any;
  deliveryCity: string;
  deliveryZipCode: number;
  deliveryState: any;
  deliveryCountry: any;
  deliveryCompanyName: string;
  items: ItemsPieceProps[];
}
const DataForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<IFormInput>();

  const { fields, remove, append } = useFieldArray({ control, name: "items" });

  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log("Data", data);

  const [sectionExpand, setSectionExpand] = useState(
    PersonInformation.ClientDetails as string
  );

  const [randomKeyGenerate, setRandomKeyGenerate] = useState("");
  const generateRandomString = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    setRandomKeyGenerate(randomString);
    setValue("referenceNumber", randomString);
  };

  useEffect(() => {
    register("referenceNumber", randomKeyGenerate as any);
  }, [register, randomKeyGenerate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex--column basic-form container'>
        <h1 className='order-heading font--bold font-size--32 line-height--48 text--center mb--24'>
          Delivery Site
        </h1>
        <div className='detail-wrapper border--grey-500 mb--24 padding--16'>
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={"Client Details"}
          >
            <div className='form-item mt--5'>
              <Controller
                name='client'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='Client'
                    fieldName='client'
                    onChange={onChange}
                    options={ClientOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.client && (
                <ErrorMessage name={"Please add date and time"} />
              )}
            </div>
            <div className='form-item'>
              <Controller
                name='serviceType'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='Service Type'
                    fieldName='serviceType'
                    onChange={onChange}
                    options={ServiceTypeOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.serviceType && (
                <ErrorMessage name={"Please add date and time"} />
              )}
            </div>
            <div className='form-item'>
              <Controller
                name='requestedDate'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <p className='mb--5 font--bold'>Date And Time</p>
                    <DateTimePicker className={"width--full"} {...field} />
                  </>
                )}
              />
              {errors.requestedDate && (
                <ErrorMessage name={"Please add date and time"} />
              )}
            </div>
            <div className='form-item'>
              <Controller
                name='parcelType'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='Parcel Type'
                    fieldName='parcelType'
                    onChange={onChange}
                    options={ParcelTypeOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.parcelType && (
                <ErrorMessage name={"Please add date and time"} />
              )}
            </div>
            <div className='form-item'>
              <p className='mb--5 font--bold'>Shipment Reference Number</p>
              <Controller
                name='referenceNumber'
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <div className='reference-number flex align-items--center'>
                    <input
                      className='form__input'
                      readOnly
                      {...register("referenceNumber")}
                      name='referenceNumber'
                      placeholder='Shipment Reference Number'
                    />
                    <button
                      type='button'
                      className='ml--20 form__submit font--bold text--white'
                      onClick={() => generateRandomString(15)}
                    >
                      Random No.
                    </button>
                  </div>
                )}
              />

              {errors.referenceNumber && (
                <ErrorMessage name='Reference number is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='Items Name'
                register={register}
                name='itemsName'
                placeholder='Items Name'
              />
              {errors.itemsName && (
                <ErrorMessage name='Items name is required' />
              )}
            </div>
            <div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className='multi-items flex align-items--center justify-content--between  mt--10'
                >
                  <div className='piece mr--15'>
                    <div className='form-item flex align-items--center justify-content--between mt--5'>
                      <div className='width--full mr--15'>
                        <p className='font--bold mb--5'>Piece</p>
                        <input
                          type='number'
                          className='form__input mb--5'
                          key={field.id}
                          {...register(`items.${index}.Piece`)}
                        />
                      </div>
                      <div className='width--full'>
                        <p className='font--bold mb--5'>Weight</p>
                        <input
                          type='number'
                          className='form__input'
                          key={field.id}
                          {...register(`items.${index}.Weight`)}
                        />
                      </div>
                    </div>
                    <div className='form-item flex align-items--center justify-content--between mt--5'>
                      <div className='width--full mr--15'>
                        <p className='font--bold mb--5'>Length</p>
                        <input
                          type='number'
                          className='form__input'
                          key={field.id}
                          {...register(`items.${index}.Length`)}
                        />
                      </div>
                      <div className='width--full mr--15'>
                        <p className='font--bold mb--5'>Width</p>
                        <input
                          type='number'
                          className='form__input'
                          key={field.id}
                          {...register(`items.${index}.Width`)}
                        />
                      </div>
                      <div className='width--full mr--15'>
                        <p className='font--bold mb--5'>Height</p>
                        <input
                          type='number'
                          className='form__input'
                          key={field.id}
                          {...register(`items.${index}.Height`)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type='button'
                      className='remove__btn font--bold text--white'
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='add-item__btn font--bold text--white'
                onClick={() =>
                  append({
                    Piece: null,
                    Weight: null,
                    Height: null,
                    Width: null,
                    Length: null,
                  })
                }
              >
                Add Item
              </button>
            </div>
          </CollapseBox>
        </div>
        <div className='sender-wrapper border--grey-500 mb--24 padding--16'>
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={"Sender Information"}
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
            <div className='form-item mt--5'>
              <FormInputField
                type='text'
                title='Company'
                register={register}
                name='senderCompanyName'
                placeholder='Company'
              />
              {errors.senderCompanyName && (
                <ErrorMessage name='Company name is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='Address'
                register={register}
                name='senderAddress'
                placeholder='Address'
              />
              {errors.senderAddress && (
                <ErrorMessage name='Address is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='City'
                register={register}
                name='senderCity'
                placeholder='City'
              />
              {errors.senderCity && <ErrorMessage name='City is required' />}
            </div>
            <div className='form-item'>
              <FormInputField
                type='number'
                title='Postal Code/ZIP'
                register={register}
                name='senderZipCode'
                placeholder='Postal Code/ZIP'
              />
              {errors.senderZipCode && (
                <ErrorMessage name='Zip code number is required' />
              )}
            </div>
            <div className='form-item mt--5'>
              <Controller
                name='senderState'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='State'
                    fieldName='senderState'
                    onChange={onChange}
                    options={StateOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.senderState && (
                <ErrorMessage name={"State is required"} />
              )}
            </div>
            <div className='form-item mt--5'>
              <Controller
                name='senderCountry'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='Country'
                    fieldName='senderCountry'
                    onChange={onChange}
                    options={CountryOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.senderCountry && (
                <ErrorMessage name={"Country is required"} />
              )}
            </div>
            <div className='form-item'>
              <p className='mb--5 font--bold'>Phone Number</p>
              <Controller
                name='senderPhone'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className='form__input'
                    defaultCountry='US'
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.senderPhone && (
                <ErrorMessage name='Phone number is required' />
              )}
            </div>
            <div className='form-item'>
              <p className='mb--5 font--bold'>Email</p>
              <input
                type='email'
                className='form__input'
                placeholder='Sender Email'
                {...register("senderEmail", {
                  required: false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.senderEmail?.message && (
                <ErrorMessage name={errors.senderEmail?.message} />
              )}
            </div>
          </CollapseBox>
        </div>
        <div className='deliver-wrapper border--grey-500 padding--16 mb--24'>
          <CollapseBox
            sectionExpand={sectionExpand}
            setSectionExpand={setSectionExpand}
            title={"Delivery Information"}
          >
            <div className='form-item mt--5'>
              <FormInputField
                type='text'
                title='Delivery Company Name'
                register={register}
                name='deliveryCompanyName'
                placeholder='Contact Name'
              />
              {errors.deliveryCompanyName && (
                <ErrorMessage name='Contact name is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='Address'
                register={register}
                name='deliveryAddress'
                placeholder='Address'
              />
              {errors.deliveryAddress && (
                <ErrorMessage name='Address is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='City'
                register={register}
                name='deliveryCity'
                placeholder='City'
              />
              {errors.deliveryCity && <ErrorMessage name='City is required' />}
            </div>
            <div className='form-item'>
              <FormInputField
                type='number'
                title='Postal Code/ZIP'
                register={register}
                name='deliveryZipCode'
                placeholder='Postal Code/ZIP'
              />
              {errors.deliveryZipCode && (
                <ErrorMessage name='Zip code number is required' />
              )}
            </div>
            <div className='form-item mt--5'>
              <Controller
                name='deliveryState'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='State'
                    fieldName='deliveryState'
                    onChange={onChange}
                    options={StateOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.deliveryState && (
                <ErrorMessage name={"State is required"} />
              )}
            </div>
            <div className='form-item mt--5'>
              <Controller
                name='deliveryCountry'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <InputSelect
                    label='Country'
                    fieldName='deliveryCountry'
                    onChange={onChange}
                    options={CountryOptions}
                    selectedValue={value}
                  />
                )}
              />
              {errors.deliveryCountry && (
                <ErrorMessage name={"Country is required"} />
              )}
            </div>
            <div className='form-item'>
              <p className='mb--5 font--bold'>Email</p>
              <input
                type='email'
                className='form__input'
                placeholder='Deliver Email'
                {...register("deliverEmail", {
                  required: false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.deliverEmail?.message && (
                <ErrorMessage name={errors.deliverEmail?.message} />
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
            <div className='form-item'>
              <p className='mb--5 font--bold'>Phone Number</p>
              <Controller
                name='deliverPhone'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    className='form__input'
                    defaultCountry='US'
                    international
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              {errors.deliverPhone && (
                <ErrorMessage name='Phone number is required' />
              )}
            </div>
            <div className='form-item'>
              <FormInputField
                type='text'
                title='Location'
                register={register}
                name='deliverLocation'
                placeholder='Deliver Location'
              />
              {errors.deliverLocation && (
                <ErrorMessage name='Location is required' />
              )}
            </div>
          </CollapseBox>
        </div>
        <div className='form-item'>
          <button className='form__submit font--bold text--white' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
export default DataForm;
