import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, Truck, Shield, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonalInfoForm } from "@/components/checkout/PersonalInfoForm";
import { ShippingAddressForm } from "@/components/checkout/ShippingAddressForm";
import { PaymentMethodForm } from "@/components/checkout/PaymentMethodForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutData, PersonalInfo, Address, PaymentMethod } from "@/types/Checkout";
import { Animal } from "@/types/Animal";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México"
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México"
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit_card',
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const subtotal = totalPrice;
  const shipping = subtotal > 300 ? 0 : 50;
  const tax = Math.round(subtotal * 0.16);
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: "Información Personal", icon: "👤" },
    { number: 2, title: "Dirección de Envío", icon: "📍" },
    { number: 3, title: "Método de Pago", icon: "💳" },
    { number: 4, title: "Confirmación", icon: "✅" }
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("Order placed:", {
      personalInfo,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      paymentMethod,
      items: cartItems,
      total
    });

    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Header cartItemsCount={0} onCartClick={() => {}} />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Pedido Confirmado!
              </h1>
              
              <p className="text-gray-600 mb-8">
                Gracias por tu compra. Recibirás un email de confirmación en breve.
                Tu pedido será procesado y enviado en las próximas 24-48 horas.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">Resumen del Pedido</h3>
                <p className="text-2xl font-bold text-green-600">${total}</p>
                <p className="text-sm text-gray-500">{cartItems.length} artículos</p>
              </div>
              
              <button
                onClick={() => navigate("/")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Header cartItemsCount={0} onCartClick={() => {}} />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 mb-8">
              Agrega algunos animales exóticos antes de proceder al checkout.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header cartItemsCount={cartItems.length} onCartClick={() => {}} />
      
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold ${
                  currentStep >= step.number 
                    ? "bg-green-600 text-white" 
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > step.number ? "✓" : step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? "text-green-600" : "text-gray-500"
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-green-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Back Button */}
                <button
                  onClick={currentStep === 1 ? () => navigate("/") : handlePrevStep}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {currentStep === 1 ? "Volver al carrito" : "Paso anterior"}
                </button>

                {/* Step Content */}
                {currentStep === 1 && (
                  <PersonalInfoForm
                    personalInfo={personalInfo}
                    onPersonalInfoChange={setPersonalInfo}
                    onNext={handleNextStep}
                  />
                )}

                {currentStep === 2 && (
                  <ShippingAddressForm
                    shippingAddress={shippingAddress}
                    onShippingAddressChange={setShippingAddress}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}

                {currentStep === 3 && (
                  <PaymentMethodForm
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    billingAddress={billingAddress}
                    onBillingAddressChange={setBillingAddress}
                    sameAsShipping={sameAsShipping}
                    onSameAsShippingChange={setSameAsShipping}
                    shippingAddress={shippingAddress}
                    onNext={handleNextStep}
                    onPrev={handlePrevStep}
                  />
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Confirmar Pedido
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-4">Resumen del Pedido</h3>
                        <div className="space-y-2">
                          {cartItems.map((item: Animal, index: number) => (
                            <div key={`${item.id}-${index}`} className="flex justify-between">
                              <span>{item.name}</span>
                              <span>${item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Dirección de Envío</h3>
                        <p className="text-gray-600">
                          {shippingAddress.firstName} {shippingAddress.lastName}<br />
                          {shippingAddress.address1}<br />
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                        </p>
                      </div>

                      {/* Payment Info */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Método de Pago</h3>
                        <p className="text-gray-600">
                          {paymentMethod.type === 'credit_card' && `**** **** **** ${paymentMethod.cardNumber?.slice(-4)}`}
                          {paymentMethod.type === 'paypal' && 'PayPal'}
                          {paymentMethod.type === 'bank_transfer' && 'Transferencia Bancaria'}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handlePrevStep}
                          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                        >
                          Anterior
                        </button>
                        <button
                          onClick={handlePlaceOrder}
                          disabled={isProcessing}
                          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Procesando...
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              Confirmar Pedido
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />

              {/* Security Features */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Compra Segura</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Encriptación SSL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Envío asegurado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Pago protegido</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;