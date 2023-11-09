import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface IFormInput {
  senderName: string;
  subject: string;
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
    watch,
    control,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex--column basic-form'>
        <div className='form-item'>
          <TextField {...register("subject")} label='Subject' />
        </div>
        <div className='form-item'>
          <TextField {...register("senderName")} label='Sender Name' />
        </div>
        <div className='form-item'>
          <TextField
            {...register("senderContactName")}
            label='Sender Contact Name'
          />
        </div>
        <div className='form-item'>
          <TextField
            {...register("senderEmail", { required: true })}
            aria-invalid={errors.senderEmail ? "true" : "false"}
            label='Sender Email'
            // type='email'
          />
          {errors.senderName?.type === "required" && (
            <p role='alert'>Sender Name is required</p>
          )}
        </div>
        <div className='form-item'>
          <Controller
            name='senderDateAndTime'
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label='Sender Date And Time' {...field} />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />
        </div>
        <div className='form-item'>
          <PhoneInput
            isValid={true}
            country={"us"}
            specialLabel={""}
            value={watch("senderPhone")}
            inputProps={register("senderPhone", { required: true })}
            containerStyle={
              errors.senderPhone?.type && {
                border: "1px solid red",
                borderRadius: "5px",
              }
            }
          />
        </div>

        <div className='form-item'>
          <TextField {...register("itemsName")} label='Item Name' />
        </div>
        <div className='form-item'>
          <TextField {...register("deliverName")} label='Deliver Name' />
        </div>
        <div className='form-item'>
          <TextField
            {...register("deliverContactName")}
            label='Deliver Contact Name'
          />
        </div>
        <div className='form-item'>
          <Controller
            name='deliverDateAndTime'
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label='Deliver Date And Time' {...field} />
                </DemoContainer>
              </LocalizationProvider>
            )}
          />
        </div>
        <div className='form-item'>
          <PhoneInput
            isValid={true}
            country={"us"}
            specialLabel={"Phone"}
            value={watch("deliverPhone")}
            inputProps={register("deliverPhone", { required: true })}
            containerStyle={
              errors.deliverPhone?.type && {
                border: "1px solid red",
                borderRadius: "5px",
              }
            }
          />
        </div>
        <div className='form-item'>
          <TextField
            {...register("deliverLocation")}
            label='Deliver Location'
          />
        </div>
        <div className='form-item'>
          <TextField
            {...register("deliverEmail")}
            label='Deliver Email'
            // type='email'
          />
        </div>
        <div className='form-item'>
          <Button variant='contained' type='submit'>
            Send
          </Button>
        </div>
      </div>
    </form>
  );
};
export default DataForm;
