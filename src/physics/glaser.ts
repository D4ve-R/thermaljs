import { MaterialLayer } from '../materials/Material';
import { heatTransferR, getRsFromDirection } from './heatTransfer';
import { vaporSaturationPressure } from './vaporSaturationPressure';

/**
 * Glaser procedure
 * 
 * Determine if condensate will appear in the component.
 * 
 * DIN 4108-3 compliant
 * @param layers 
 * @param tempIntern internal temperature
 * @param tempExtern external temperature
 * @param direction heat flow direction, can be 'up', 'side' or 'down'
 * @returns condensate amount in kg/m² for winter and summer, index of layer where condensate will appear, data of calculation
 */
export function glaser(layers: MaterialLayer[], tempIntern: number, tempExtern: number, direction: string){
	const deltaTemp = Math.abs(tempIntern - tempExtern);
	const rs = getRsFromDirection(direction);
	const htr = heatTransferR(layers, direction, true);
	const heatFluxDensity = deltaTemp / htr;
	
	const result: {temp: number, ps: number, sd: number}[] = [];
	let condesateOccuranceIdx = null;
	let deltaPE = 0.0;
	let deltaPA = 0.0;
	let sumSd = 0.0;
	let sumSdE = 0.0;
	const m1 = vaporSaturationPressure(tempIntern, 0.5);
	const m2 = vaporSaturationPressure(tempExtern, 0.8);
	const m = m2 - m1;

	let deltaTheta = rs.rsi * heatFluxDensity;
	let temp = tempIntern - deltaTheta;
	result.push({temp: temp, ps: vaporSaturationPressure(temp), sd: 0})
	
	let i = 0;
	let foundCondensate = false;
	for(const layer of layers) {
		if(Array.isArray(layer.material))
			throw 'Material Array';
			
		deltaTheta = layer.material.htr * heatFluxDensity;
		temp -= deltaTheta;
		const ps = vaporSaturationPressure(temp);
		const sd = Sd(layer.material.vdr, layer.depth);
		sumSd += sd;

		if(!foundCondensate && m * sd + m1 > ps){
			deltaPE = m1 - ps;
			deltaPA = ps - m2;
			sumSdE = sumSd;
			condesateOccuranceIdx = i;
			foundCondensate = true;
		}

		++i;
		result.push({temp: temp, ps: ps, sd: sd});
	}

	deltaTheta = rs.rse * heatFluxDensity
	temp -= deltaTheta;
	result.push({temp: temp, ps: vaporSaturationPressure(temp), sd: 0});

	const sumSdA = sumSd - sumSdE;
	const dewWinter = calcCondensate(deltaPE, sumSdE, deltaPA, sumSdA, 1440);
	const dewSummer = calcCondensate(421, sumSdE, 421, sumSdA, 2160);
	
	return {
		condensate: { winter: dewWinter, summer: dewSummer},
		condensateIdx: condesateOccuranceIdx,
		data: result
	};
}

/**
 * Calculate Sd value
 * 
 * vapor diffusion equivalent atmospheric layer height 
 * 
 * @param vdr vapor diffusion resistance
 * @param depth depth in meter
 * @returns Sd value in meter
 */
export function Sd(vdr: number, depth: number){
	return vdr * depth;
}

/**
 * Calculate condensate
 * 
 * Calculate amount of condensate in kg/m²
 * 
 * @param pE vapor pressure of the external air
 * @param sdE Sd value of the external air
 * @param pA vapor pressure of the internal air
 * @param sdA Sd value of the internal air
 * @param hours hours
 * @returns amount of condensate in kg/m²
 */
export function calcCondensate(pE: number, sdE: number, pA: number, sdA: number, hours: number){
	return hours * (pE/sdE + pA/sdA) / 1500000;
}
