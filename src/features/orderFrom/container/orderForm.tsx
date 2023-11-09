import Form from '../component/form';
import Logo from '../../../assets/images/zip-ship.png';

const OrderForm: React.FC = () => {
  return (
    <div className="bg--white ">
      <div className="container">
        <div className="flex justify-content--between align-items--center height--100">
          <img
            src={Logo}
            alt="Not Found"
            className="width--60 height--60 object-fit--contain"
          />
          <h1 className="font-size--28 line-height--40">Order Form</h1>
        </div>
      </div>
      <hr className="border--grey-100" />
      <Form />
    </div>
  );
};
export default OrderForm;
