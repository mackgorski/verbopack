declare module 'zenstack/cli' {
    interface ZenStackConfig {
        schema: string;
        plugins?: Array<{
            name: string;
            provider: {
                fromPackage: string;
            };
        }>;
    }

    export function defineConfig(config: ZenStackConfig): ZenStackConfig;
}