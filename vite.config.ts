import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
const env = loadEnv(mode, '.', '');

return {
base: '/lifecalculator/',
};
});
