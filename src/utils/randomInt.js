export default function randomInt(min, max) {
    // min <= <= max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
