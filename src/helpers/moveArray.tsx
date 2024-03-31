export function moveArray(from: number, to: number, array: any) {
    const removerItem = array.splice(from, 1)[0];
    array.splice(to, 0, removerItem);
    return array;
}
