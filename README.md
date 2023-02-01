[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) [![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
  
# ThermalJS

Thermal is a simple physics library, performing heat transmittance & condensate calculations.  
     
The library is still under development.  

## Table of Contents

* [Description](#description)
* [Getting Started](#getting-started)
  * [Installing](#installing)
  * [Usage](#usage)
* [License](#license)

## Description

Thermal is a physics library, performing heat transmittance & condensate calculations in building components.  
It is written in TypeScript and built with Webpack.  
Thermal can be used in both Node.js and the browser.   

Features: 
 * Heat transfer resistance calculation
 * Glaser procedure to determine condensate

The calculations are based on the following standards:
- [DIN EN ISO 6946](https://de.wikipedia.org/wiki/EN_ISO_6946)
- [DIN 4108](https://de.wikipedia.org/wiki/DIN_4108)

This software is **NOT** certified in any way.


## Getting Started

### Installing

```
npm install thermaljs
```

### Usage
import the functions you need from the library
```
import { glaser, heatTransferR } from 'thermaljs';
```
create a MaterialLayer array of your component
```
const layer = [
	{depth: 0.01, material: {density: 0, vdr: 15, lambda: 1.0, sd: 0.15}},
	{depth: 0.24,  material: {density:  0, vdr: 5, lambda: 0.7, sd: 1.2}},
	{depth: 0.1,  material: {density: 0, vdr: 5, lambda: 0.04, sd: 0.5}},
	{depth: 0.005, material: {density: 0, vdr: 200, lambda: 0.7, sd: 1}},
];
```
calculate the heat transfer resistance
```
const direction = 'side';
const r = heatTransferR(layers, direction);
```
calculate the condensate
```
const tempInt = 20;
const tempExt = -10;
const condensate = glaser(layers, tempInt, tempExt, direction);
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.  

