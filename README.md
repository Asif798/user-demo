# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

# Setup Vite+Vue3+TailWindCSS3

## Create your project
npm init vite my-project
cd my-project

## Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

## Configure your template paths in tailwind.config.js file.
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## Add the Tailwind directives to your CSS (`./src/index.css`)
@tailwind base;
@tailwind components;
@tailwind utilities;

## Import the CSS file (Import the newly-created ./src/index.css file in your ./src/main.js file.)
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

## Start your build process
npm run dev