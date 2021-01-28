export function getDate(year: number, month: number, day: number): string {
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}
