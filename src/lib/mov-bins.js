import { scaleLinear } from 'd3-scale';

const lightBlue = '#88c6ea';
const darkBlue = '#0062A3';

// Lower bounds of each bin; the last bin is open-ended.
const lowerBounds = [0, 10, 20, 30, 40, 50];

const colorStep = scaleLinear().domain([0, lowerBounds.length - 1]).range([lightBlue, darkBlue]);

export const movBins = lowerBounds.map((min, i) => {
    const max = lowerBounds[i + 1];

    return {
        color: colorStep(i),
        min,
        max: max ?? Infinity,
        label: max === undefined ? `${min}+` : `${min}\u2013${max}`
    };
});

export function getBinColor(mov) {
    if (!Number.isFinite(mov) || mov <= 0) {
        return lightBlue;
    }

    return movBins.find((bin) => mov < bin.max).color;
}
