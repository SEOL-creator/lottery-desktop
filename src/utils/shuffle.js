import randomInt from "./randomInt";

function fysShuffle(arr) {
    const result = [...arr];
    for (let i = 0; i < result.length; i++) {
        const rand = randomInt(i, arr.length - 1 - i);
        const tmp = result[i];
        result[i] = result[rand];
        result[rand] = tmp;
    }
    return result;
}

export { fysShuffle };
