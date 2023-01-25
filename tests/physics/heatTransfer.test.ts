import {describe, expect, test} from '@jest/globals';

import {
	heatTransferR,
	heatTransferRInHomo,
} from '../../src/physics';

import { testCases, testCasesInHomo } from '../data';

let i = 1;
for(const data of testCases) {

	describe(`TestCase ${i}: Test heatTransferR()`, ()=> {
		test('Test diffrent heat flow directions', () => {
			const rSide = heatTransferR(data, 'side', false);
			expect(rSide).toBeGreaterThanOrEqual(3.03);
			expect(rSide).toBeLessThan(3.03001);

			const rUp = heatTransferR(data, 'up', false);
			expect(rUp).toBeGreaterThanOrEqual(3.0);
			expect(rUp).toBeLessThan(3.001);
			
			const rDown = heatTransferR(data, 'down', false);
			expect(rDown).toBeGreaterThanOrEqual(3.07);
			expect(rDown).toBeLessThan(3.07001);
		});
	});

	i++;
}

for(const data of testCasesInHomo) {

describe(`TestCase: Test heatTransferRInhomo()`, ()=> {
	test('Test diffrent heat flow directions', () => {

		const rSide = heatTransferRInHomo(data.data, 'side', 100, 100);
		expect(rSide).toBeGreaterThanOrEqual(data.result);
		expect(rSide).toBeLessThan(data.result + 0.0001);

	});
});

}