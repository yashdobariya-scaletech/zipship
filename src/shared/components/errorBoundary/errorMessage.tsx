interface Props {
  name: string | undefined;
}

const ErrorMessage: React.FC<Props> = (props) => (
  <p className="text--red-50 mt--5 font-size--12">{props.name}</p>
);
export default ErrorMessage;
