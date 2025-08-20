import { CreditCard, DollarSign } from "lucide-react";
import { PaymentMethod, Address } from "@/types/Checkout";

interface PaymentMethodFormProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  billingAddress: Address;
  onBillingAddressChange: (address: Address) => void;
  sameAsShipping: boolean;
  onSameAsShippingChange: (same: boolean) => void;
  shippingAddress: Address;
  onNext: () => void;
  onPrev: () => void;
}

export const PaymentMethodForm = ({
  paymentMethod,
  onPaymentMethodChange,
  billingAddress,
  onBillingAddressChange,
  sameAsShipping,
  onSameAsShippingChange,
  shippingAddress,
  onNext,
  onPrev
}: PaymentMethodFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    onPaymentMethodChange({ ...paymentMethod, [field]: value });
  };

  const handleBillingChange = (field: keyof Address, value: string) => {
    onBillingAddressChange({ ...billingAddress, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <CreditCard className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Método de Pago</h2>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">Selecciona tu método de pago</h3>
        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentType"
              value="credit_card"
              checked={paymentMethod.type === 'credit_card'}
              onChange={(e) => handlePaymentChange('type', e.target.value as PaymentMethod['type'])}
              className="mr-3"
            />
            <CreditCard className="w-5 h-5 mr-2" />
            <span>Tarjeta de Crédito/Débito</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentType"
              value="paypal"
              checked={paymentMethod.type === 'paypal'}
              onChange={(e) => handlePaymentChange('type', e.target.value as PaymentMethod['type'])}
              className="mr-3"
            />
            <div className="w-5 h-5 mr-2 bg-blue-600 rounded text-white text-xs flex items-center justify-center">P</div>
            <span>PayPal</span>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentType"
              value="bank_transfer"
              checked={paymentMethod.type === 'bank_transfer'}
              onChange={(e) => handlePaymentChange('type', e.target.value as PaymentMethod['type'])}
              className="mr-3"
            />
            <DollarSign className="w-5 h-5 mr-2" />
            <span>Transferencia Bancaria</span>
          </label>
        </div>
      </div>

      {/* Credit Card Form */}
      {paymentMethod.type === 'credit_card' && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Información de la Tarjeta</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Titular *
            </label>
            <input
              type="text"
              required
              value={paymentMethod.cardholderName}
              onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Como aparece en la tarjeta"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Tarjeta *
            </label>
            <input
              type="text"
              required
              value={paymentMethod.cardNumber}
              onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento *
              </label>
              <input
                type="text"
                required
                value={paymentMethod.expiryDate}
                onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                required
                value={paymentMethod.cvv}
                onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">Dirección de Facturación</h3>
        
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => onSameAsShippingChange(e.target.checked)}
            className="mr-2"
          />
          <span>Misma que la dirección de envío</span>
        </label>

        {!sameAsShipping && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={billingAddress.firstName}
                onChange={(e) => handleBillingChange('firstName', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={billingAddress.lastName}
                onChange={(e) => handleBillingChange('lastName', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <input
              type="text"
              placeholder="Dirección"
              value={billingAddress.address1}
              onChange={(e) => handleBillingChange('address1', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Ciudad"
                value={billingAddress.city}
                onChange={(e) => handleBillingChange('city', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Estado"
                value={billingAddress.state}
                onChange={(e) => handleBillingChange('state', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="CP"
                value={billingAddress.zipCode}
                onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Revisar Pedido
        </button>
      </div>
    </form>
  );
};