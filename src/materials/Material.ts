export interface Material {
	key?: string,
	description?: string
	lambda: number,
	density: number,
	vdr: number,				// vapor diffusion resistance
	htr?: number,				// heat transition coefficient
}

export interface MaterialSubLayer {
	x: number,
	y: number,
	width: number,
	height: number,
	materialIdx?: number
}

export interface MaterialLayer {
	depth: number,
	material: Material | Material[],
	sublayer?: MaterialSubLayer[]
}

export enum MaterialUnits {
	Lambda = 'W/m*K',
	Density = 'kg/m³',
	Vdr = 'µ'
}

export class Material {
	key?: string;
	description?: string
	lambda: number;
	density: number;
	vdr: number;
	htr?: number;

	constructor(material: Material|string, lambda = 0, density = 0, vdr = 0){
		if(typeof material === 'string'){
			this.key = material;
			this.lambda = lambda;
			this.density = density;
			this.vdr = vdr;
		}
	}

	public toString(){
		const string = {
			key: this.key || 'Material',
			lambda: this.lambda + ' ' + MaterialUnits.Lambda,
			density: this.density + ' ' + MaterialUnits.Density,
			vdr: this.vdr + ' ' + MaterialUnits.Vdr
		};

		return JSON.stringify(string);
	}
}
