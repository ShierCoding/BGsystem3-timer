import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const makeUUID = () => {
    let dt = new Date().getTime();
    return "xxxxxx".replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

const version = process.env.npm_package_version as string + "-" + makeUUID();

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [vue()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },

    define: {
        "__APP_VERSION__": JSON.stringify(version),
    }
}));
