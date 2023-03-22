// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            bindingaddress: string;
            bindingport: string;
            "3233_active": boolean;
            "3233_ratelimit": number;
            "415a_active": boolean;
            "415a_ratelimit": number;
            "4232_active": boolean;
            "4232_ratelimit": number;
            "5732_active": boolean;
            "5732_ratelimit": number;
            "6831_active": boolean;
            "6831_ratelimit": number;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};