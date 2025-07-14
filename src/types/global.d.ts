export {};

declare global {
    interface Window {
        __APP_CONFIG__: {
            VUE_APP_BASE_URL: string;
            [key: string]: any;
        };
    }
}
