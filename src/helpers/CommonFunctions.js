
//this function is to do the reverse calculation.
//If we have the final amount & the applied percentage then we need to find out the base value
export function getBaseValue(percentage, finalValue) {
  /*
  Basic formula -> x + (x*(p/100))=y
  p=percentage, x=base value, y=final value
  Formula: x=y/(1+(p/100))
  */
  return (finalValue / (1 + (percentage/100)));
}

export function getPercentageFromBaseAndFinalValue(baseValue, finalValue) {
  /*
  Basic formula -> x + (x*(p/100))=y
  p=percentage, x=base value, y=final value
  Formula: p=(1-(y/x))*100
  */
  return (1-(finalValue/baseValue))*100;
}



export default function calculateDicountedValueForOrder(
  totalPrice,
  totalMrpPrice,
  deliveryCharge,
  gstPercentage
) {
  
  const delivery_charge_gst =((deliveryCharge)* (gstPercentage/100));
  const priceWithoutDeliveryCharge = totalPrice-deliveryCharge;
  const baseAmountWithoutGst = getBaseValue(gstPercentage, priceWithoutDeliveryCharge).toFixed(2);
  const gstAmount = (baseAmountWithoutGst)* (gstPercentage/100);
  const discountedPercentage = (getPercentageFromBaseAndFinalValue(totalMrpPrice, baseAmountWithoutGst)).toFixed();
  return [baseAmountWithoutGst, discountedPercentage, gstAmount,delivery_charge_gst];
}
