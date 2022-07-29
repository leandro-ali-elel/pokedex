export const normalize = (text: string | null): string =>
  text ? text.toLowerCase() : '';
