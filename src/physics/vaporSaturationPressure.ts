/**
 * Vapor saturation pressure approximation
 * 
 * Calculate vsp for a given temperature and humidity
 * 
 * @param temp temperature between -20 and +30 degree celsius
 * @param humidity relative humidity, number between 0.0 and 1.0
 * @returns vsp in pascal
 */
export function vaporSaturationPressure(temp: number, humidity = 1.0){
	if(temp >= 0 && temp < 30)
		return 288.68 * Math.pow(1.0981 + temp / 100, 8.02) * humidity;

	if(temp <= 0 && temp > -20)
		return 4.689 * Math.pow(1.486 + temp / 100, 12.3) * humidity;

	throw 'Vapor Saturation Pressure Calc: Temperature must be within -20 and +30 degrees Celsius';
}

/**
 * Vapor saturation pressure approximation
 * 
 * EN ISO 13788 compliant
 * @param temp temperature in degree celsius
 * @param humidity relative humidity, number between 0.0 and 1.0
 * @returns vsp in pascal
 */
export function vsp(temp: number, humidity = 1.0){
	const factor = 610.5;
	if(temp >= 0 && temp < 35)
		return factor * Math.exp(17.269 * temp / (237.3 + temp)) * humidity;

	if(temp < 0 && temp > -30)
		return factor * Math.exp(21.875 * temp / (265.5 + temp)) * humidity;

	throw 'Vapor Saturation Pressure Calc EN ISO 13788: Temperature must be within -30 and +35 degrees Celsius';
}