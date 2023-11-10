import Logo from '../../../assets/images/zip-ship.png';
import DataForm from '../component/form';

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
          <h1 className="zip-ship-heading font-size--28 line-height--40">
            Zip Ship
          </h1>
        </div>
      </div>
      <hr className="border--grey-100" />

      <DataForm />
    </div>
  );
};
export default OrderForm;
