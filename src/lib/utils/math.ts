// src/lib/utils/math.ts

/** Greatest Common Divisor */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/** Least Common Multiple */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/** LCM of an array — ppcm(ai) */
export function lcmArray(arr: number[]): number {
  return arr.reduce((acc, val) => lcm(acc, val), arr[0]);
}

/** Round to n decimals */
export function round(value: number, decimals: number = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Weighted mean: X̄ = Σ fi × xi */
export function weightedMean(values: number[], frequencies: number[]): number {
  const n = frequencies.reduce((s, f) => s + f, 0);
  const sum = values.reduce((s, v, i) => s + v * frequencies[i], 0);
  return round(sum / n);
}

/** Variance: V(X) = Σ fi × (xi - X̄)² */
export function weightedVariance(values: number[], frequencies: number[], mean: number): number {
  const n = frequencies.reduce((s, f) => s + f, 0);
  const sum = values.reduce((s, v, i) => s + frequencies[i] * Math.pow(v - mean, 2), 0);
  return round(sum / n);
}

/** Moment centré d'ordre r: μr = Σ fi × (xi - X̄)^r */
export function centeredMoment(values: number[], frequencies: number[], mean: number, order: number): number {
  const n = frequencies.reduce((s, f) => s + f, 0);
  const sum = values.reduce((s, v, i) => s + frequencies[i] * Math.pow(v - mean, order), 0);
  return round(sum / n, 6);
}

/**
 * Find quantile by rank.
 * r = n × p/100
 * If r is integer: Q = (x_r + x_{r+1}) / 2
 * If r is not integer: Q = x_{floor(r)+1}
 */
export function findQuantile(
  values: number[],
  cumulatedEffectifs: number[],
  n: number,
  p: number
): number {
  const r = n * p / 100;
  const isInteger = Number.isInteger(r);

  if (isInteger) {
    let xr: number | null = null;
    let xr1: number | null = null;
    for (let i = 0; i < cumulatedEffectifs.length; i++) {
      if (xr === null && cumulatedEffectifs[i] >= r) {
        xr = values[i];
      }
      if (xr1 === null && cumulatedEffectifs[i] >= r + 1) {
        xr1 = values[i];
        break;
      }
    }
    return round(((xr ?? 0) + (xr1 ?? 0)) / 2);
  } else {
    const target = Math.floor(r) + 1;
    for (let i = 0; i < cumulatedEffectifs.length; i++) {
      if (cumulatedEffectifs[i] >= target) {
        return values[i];
      }
    }
    return values[values.length - 1];
  }
}

/**
 * Interpolated quantile for classified data.
 * Find class where Ficc crosses p, then:
 * Q = a + (b-a) × (p - F(a)) / (F(b) - F(a))
 */
export function findQuantileClass(
  bornesInf: number[],
  bornesSup: number[],
  ficc: number[],
  p: number
): number {
  const target = p;
  for (let i = 0; i < ficc.length; i++) {
    if (ficc[i] >= target) {
      const a = bornesInf[i];
      const b = bornesSup[i];
      const Fa = i > 0 ? ficc[i - 1] : 0;
      const Fb = ficc[i];
      return round(a + (b - a) * (target - Fa) / (Fb - Fa));
    }
  }
  return bornesSup[bornesSup.length - 1];
}

/**
 * Mode by Thales for classified data:
 * Δ1 = densityModale - densityPrecedente
 * Δ2 = densityModale - densitySuivante
 * Mo = xi + Δ1/(Δ1+Δ2) × (xi+1 - xi)
 */
export function modeThales(
  borneInf: number,
  borneSup: number,
  densityPrev: number,
  densityCurrent: number,
  densityNext: number
): number {
  const delta1 = densityCurrent - densityPrev;
  const delta2 = densityCurrent - densityNext;
  if (delta1 + delta2 === 0) return round((borneInf + borneSup) / 2);
  return round(borneInf + (delta1 / (delta1 + delta2)) * (borneSup - borneInf));
}

/** Gini index: IG = 1 - Σ fi × (Gi-1 + Gi) */
export function giniIndex(fi: number[], Gi: number[]): number {
  let sum = 0;
  for (let i = 0; i < fi.length; i++) {
    const GiPrev = i === 0 ? 0 : Gi[i - 1];
    sum += fi[i] * (GiPrev + Gi[i]);
  }
  return round(1 - sum);
}
