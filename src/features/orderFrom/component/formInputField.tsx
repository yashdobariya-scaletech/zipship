interface Props {
  title: string;
  register: any;
  name: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
  value?: any;
}
export const FormInputField: React.FC<Props> = (props) => {
  return (
    <>
      <p className="mb--5 font--bold">{props.title || ''}</p>
      <input
        className="form__input"
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name, {
          required: true,
        })}
        disabled={props.disabled}
        value={props.value}
      />
    </>
  );
};
