const testCase1 = [
	{depth: 0.01, material: {key: 'innenputz', density: 0, vdr: 15, lambda: 1.0, sd: 0.15}},
	{depth: 0.24,  material: {key: 'ziegelmauer', density:  0, vdr: 5, lambda: 0.7, sd: 1.2}},
	{depth: 0.1,  material: {key: 'daemmung', density: 0, vdr: 5, lambda: 0.04, sd: 0.5}},
	{depth: 0.005, material: {key: 'aussenputz', density: 0, vdr: 200, lambda: 0.7, sd: 1}},
];

export const testCases = [
	testCase1,
];

const testCase2 = {
	result: 1.4770428,
	data: [
		{ depth: 0.1, material: [{
				lambda: 0.1,
				vdr: 1,
				density: 1,
			}],
		},{ depth: 0.1, material: [{
				lambda: 1,
				vdr: 1,
				density: 1,
			},{
				lambda: 0.1,
				vdr: 1,
				density: 1,
			}],
			sublayer: [{
				x: 0,
				y: 0,
				width: 50,
				height: 100,
				materialIdx: 1,
			}]
		}
	] 
};

const testCase3 = {
	result: 3.57,
	data: [
		{ depth: 0.2, material: [{
				lambda: 2,
				vdr: 1,
				density: 1,
			}],
		},
		{ depth: 0.16, material: [{
				lambda: 0.04,
				vdr: 1,
				density: 1,
			},{
				lambda: 0.13,
				vdr: 1,
				density: 1,
			}],
			sublayer: [{
				x: 0,
				y: 0,
				width: 10,
				height: 100,
				materialIdx: 1,
			}]
		}
	]
}

export const testCasesInHomo = [
	testCase2,
	testCase3,
];