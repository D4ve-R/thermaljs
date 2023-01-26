
/**
 * Material interface
 * @param lambda thermal conductivity of material
 * @param density density of material
 * @param vdr vapor diffusion resistance of material
 * @param htr heat transition coefficient of material
 */
export interface Material {
	lambda: number,
	density: number,
	vdr: number,
	htr?: number,
}


/**
 * Material sublayer interface
 * @param x startX position of sublayer
 * @param y startY position of sublayer
 * @param width width of sublayer
 * @param height height of sublayer
 * @param materialIdx index of material in material array of layer
 */
export interface MaterialSubLayer {
	x: number,
	y: number,
	width: number,
	height: number,
	materialIdx?: number
}

/**
 * Material layer interface
 * @param depth layer depth in meter
 * @param material material or array of materials of layer
 * @param sublayer sublayer of layer
 */
export interface MaterialLayer {
	depth: number,
	material: Material | Material[],
	sublayer?: MaterialSubLayer[]
}

/**
 * Material units
 */
export enum MaterialUnits {
	Lambda = 'W/m*K',
	Density = 'kg/m³',
	Vdr = 'µ'
}

export class TheMaterial implements Material {
	
	constructor(
		public lambda: number, 
		public vdr: number, 
		public density: number, 
		public key?: string, 
		public description?: string
	) 
	{}

	/**
	 * Get json string representation of material
	 * 
	 * @returns material as json string
	 */
	public toString(){
		const string = {
			key: this.key || 'Material',
			lambda: this.lambda + ' ' + MaterialUnits.Lambda,
			density: this.density + ' ' + MaterialUnits.Density,
			vdr: this.vdr + ' ' + MaterialUnits.Vdr
		};

		return JSON.stringify(string);
	}

	/**
	 * Calculate sd value for material's vapor diffusion resistance
	 * 
	 * @param depth depth of material in meter
	 * @returns sd value in meter
	 */
	public sd(depth: number){
		return this.vdr * depth;
	}
}
