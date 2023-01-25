import {describe, expect, test} from '@jest/globals';

import {
	glaser,
	vaporSaturationPressure,
	Sd
} from '../../src/physics';

import { testCases } from '../data';


describe('Test temp to vapor pressure saturation', ()=> {
	test('Temp 20 degrees', () => {
		const temp = vaporSaturationPressure(20);
		expect(temp).toBeGreaterThan(2339.63);
		expect(temp).toBeLessThan(2339.64);
	});

	test('Temp 15 degrees', () => {
		const temp = vaporSaturationPressure(15);
		expect(temp).toBeGreaterThan(1707.40);
		expect(temp).toBeLessThan(1707.41);
	});

	test('Temp 13.45 degrees', () => {
		const temp = vaporSaturationPressure(13.45);
		expect(temp).toBeGreaterThan(1544.58);
		expect(temp).toBeLessThan(1544.59);
	});

	test('Temp -5.7 degrees', () => {
		const temp = vaporSaturationPressure(-5.7);
		expect(temp).toBeGreaterThan(378.422);
		expect(temp).toBeLessThan(378.423);
	});

	test('Temp -10 degrees', () => {
		const temp = vaporSaturationPressure(-10);
		expect(temp).toBeGreaterThan(259.877);
		expect(temp).toBeLessThan(259.878);
	});

	test('Temp 0 degrees', () => {
		const temp = vaporSaturationPressure(0);
		expect(temp).toBeGreaterThan(611.455);
		expect(temp).toBeLessThan(611.456);
	});

	test('Temp +35 degrees, throwError', () => {
		expect(() => {
			vaporSaturationPressure(35);
		}).toThrow();
	});

	test('Temp -35 degrees, throwError', () => {
		expect(() => {
			vaporSaturationPressure(-35);
		}).toThrow();
	});

});

let i = 1;
for(const data of testCases) {

	describe(`TestCase ${i}: Test sD calculation`, ()=> {
			for(const d of data) {
				const m = d.material;
				test(`Temp ${d.depth}m vdr ${m.vdr}`, () => {
					const sD = Sd(m.vdr, d.depth);
					expect(sD).toBe(m.sd);
				});
			}
	});

	describe(`TestCase ${i}: Test glaser procedur`, ()=> {
		test('Glaser procedur', () => {
			const result = glaser(data, 20, -10, 'side');
			expect(result.data.length).toBe(6);

			const { winter, summer } = result.condensate;
			expect(winter < summer).toBe(true);
		});
	});

	++i;
}


