export default function generateAscArray(start, length) {
    return Array.from({ length: length }, (_, i) => i + start);
}
