import {customRef} from "vue";

export function debounceRef(value: any, delay = 1000) {
    let timeout = delay;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        }
    })
}