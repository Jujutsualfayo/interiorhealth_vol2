import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const PaymentButton = ({ email, name, amount, phone }) => {
  const config = {
    public_key: "FLWPUBK_TEST-42fdd6fa880919189b9c653c358a96ef-X", 
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: "KES",
    payment_options: "card,mpesa",
    customer: {
      email: email,
      phonenumber: phone,
      name: name,
    },
    customizations: {
      title: "Interior Health Payment",
      description: "Payment for health product",
      logo: "https://your-logo-url.com/logo.png",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return <FlutterWaveButton {...fwConfig} />;
};

export default PaymentButton;
