export interface Lines {
  [line: string]: string | null;
}

export function extractNumbers(lines: Lines): string[] {
  const values: string[] = Object.values(lines).filter(v => v !== null) as string[];
  return [...new Set([...Object.keys(lines), ...values])];
}