export function generateRandomId(): number {
  return +Math.random().toString().replace('.0', '');
}
