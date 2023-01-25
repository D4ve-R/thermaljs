import { MaterialLayer } from '../materials/Material';


enum RsInternal {
	Up = 0.1,
	Side = 0.13,
	Down = 0.17
}

enum RsExternal {
	Up = 0.04,
	Side = 0.04,
	Down = 0.04
}

/**
 * 
 * @param layer material layer of component
 * @param update update htr of materials in layer
 * @returns 
 */
function _heatTransferR(layer: MaterialLayer, update = true){
	let htr = 0.0;

	if(Array.isArray(layer.material)){
		const htrs: number[] = [];
		for(const material of layer.material){
			htr = layer.depth / material.lambda;
			htrs.push(htr);
			if(update)
				material.htr = htr;
		}
		return htrs;
	}

	htr = layer.depth / layer.material.lambda;

	if(update)
		layer.material.htr = htr;

	return htr;
}

/**
 * Heat transfer resistance of inhomogen components
 * 
 * Calculates the heat transfer resistance of a component with inhomogeneous material layers
 * @param layers 
 * @param direction heat flow direction, can be 'up', 'side' or 'down'
 */
export function heatTransferRInHomo(layers: MaterialLayer[], direction: string, width: number, height: number){
	// TODO make this function more efficient
	const rs = getRsFromDirection(direction);

	const result = new Array(width * height).fill(0);
	const valueCount = {};
	for(let i = 0; i < height; ++i){
		for(let j = 0; j < width; ++j){
			const idx = i * width + j;

			for(let l = 0; l < layers.length; ++l){
				const layer = layers[l];
				let subLayerHtrFound = false;

				if(layer.sublayer === undefined){
					result[idx] += layer.depth / layer.material[0].lambda;
					continue;
				}

				for(let k = 0; k < layer.sublayer.length; ++k){
					const sublayer = layer.sublayer[k];
					const materialIdx = sublayer.materialIdx > 0 ? sublayer.materialIdx : 0;
					const subLayerR = layer.depth / layer.material[materialIdx].lambda;

					if(sublayer.x <= j && sublayer.x + sublayer.width > j && sublayer.y <= i && sublayer.y + sublayer.height > i) {
						result[idx] += subLayerR;
						subLayerHtrFound = true;
						break;
					}
				}

				if(!subLayerHtrFound)
					result[idx] += layer.depth / layer.material[0].lambda;
			}
			
			result[idx] += rs.rsi + rs.rse;

			if(valueCount[result[idx]] === undefined){
				valueCount[result[idx]] = {};
				valueCount[result[idx]].count = 0;
				valueCount[result[idx]].pos = [];
			}

			valueCount[result[idx]].count++;
			valueCount[result[idx]].pos.push({x: j, y: i});
		}
	}
	
	let rTop = 0.0;
	for(const key in valueCount) {
		const fraction = valueCount[key].count / (width * height);
		rTop += fraction / Number(key);
	}

	rTop = 1 / rTop;

	let rBottom = 0.0;
	for(let i = 0; i < layers.length; ++i){
		const layer = layers[i];
		let rLayer = 0.0;
		for(const key in valueCount){ 
			const fraction = valueCount[key].count / (width * height);
			const pos = valueCount[key].pos[0];

			if(layer.sublayer === undefined){
				rLayer += fraction / (layer.depth / layer.material[0].lambda);
				continue;
			}

			let foundInSublayer = false;
			for(let k = 0; k < layer.sublayer.length; ++k){
				const sublayer = layer.sublayer[k];
				const materialIdx = sublayer.materialIdx > 0 ? sublayer.materialIdx : 0;
				const subLayerR = layer.depth / layer.material[materialIdx].lambda;

				if(sublayer.x <= pos.x && sublayer.x + sublayer.width > pos.x && sublayer.y <= pos.y && sublayer.y + sublayer.height > pos.y) {
					rLayer += fraction / subLayerR;
					foundInSublayer = true;
					break;
				}
			}

			if(!foundInSublayer)
				rLayer += fraction / (layer.depth / layer.material[0].lambda);

		}

		//console.log(rLayer);
		rBottom += 1 / rLayer;
	}
	rBottom += rs.rsi + rs.rse;
	
	return (rTop + rBottom) / 2;
}

/**
 * Heat transfer resistance of homogen components
 * 
 * Calculates the heat transfer resistance of a component with given homogeneous material layers
 * @param layers material layers of component, ordered from inside to outside
 * @param direction heat flow direction, can be 'up', 'side' or 'down'
 * @param update update htr of materials in layers, default is true
 * @returns 
 */
export function heatTransferR(layers: MaterialLayer[], direction: string, update = true) {
	let r = 0.0;

	const rs = getRsFromDirection(direction);
	r += rs.rsi + rs.rse;

	for(const layer of layers) {
		const htr = _heatTransferR(layer, update);

		if(Array.isArray(htr))
			throw 'heatTransferR does not support inhomogeneous materials';

		r += htr;
	}

	return r;
}

/**
 * 
 * @param direction heat flow direction, can be 'up', 'side' or 'down'
 * @returns object with rsi and rse, rsi is the internal resistance, rse is the external resistance
 */
export function getRsFromDirection(direction: string){
	let result: {
		rsi: number,
		rse: number
	};

	switch(direction.toLowerCase()){
		case 'up':
		case 'upward':
		case 'upwards':
		case 'vertical-up':
		case 'ascending':
			result = {rsi: RsInternal.Up, rse: RsExternal.Up};
			break;
		case 'side':
		case 'sideway':
		case 'sideways':
		case 'sideward':
		case 'sidewards':
		case 'horizontal':
			result ={rsi:  RsInternal.Side, rse:  RsExternal.Side};
			break;
		case 'down':
		case 'downward':
		case 'downwards':
		case 'vertical-down':
		case 'descending':
			result = { rsi: RsInternal.Down, rse: RsExternal.Down};
			break;
		default:
			throw 'No valid transition direction of [ up, side, down ] was given';
	}
	return result;
}
