import { useState } from "react";

export default function useInput(initialValue, validator) {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        const value = event.target.value;
        if (validator === undefined) {
            setValue(value);
        } else {
            if (validator(value)) {
                setValue(value);
            }
        }
    };
    return { value, onChange };
}
