import { pantConfig } from '../';

export function isDef(val: any): boolean {
  return val !== undefined && val !== null;
}

export function isNumeric(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val: number): val is typeof NaN {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}

export function addUnit(value?: number | string): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }
  const viewportWidth = pantConfig('viewportWidth');
  value = value + '';
  if (isNumeric(value)) {
    if (viewportWidth > 0) {
      return (+value * 100) / viewportWidth + 'vw';
    } else {
      return value + 'px';
    }
  } else {
    return value;
  }
}