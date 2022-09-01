import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-c', 'flex items-center justify-center'],
    ['h-fs', 'h-[calc(100vh-60px)]'],
    [
      'btn',
      'px-4 py-1 text-sm text-#daab66 font-semibold rounded-full border border-#daab66 hover:text-white hover:bg-#daab66 hover:border-transparent focus:outline-none focus:ring-2 ring-#daab66 ring-opacity-40 cursor-pointer text-center',
    ],
    ['ani-bounce', 'animate-bounce animate-count-infinite animate-duration-3s'],
  ],
  theme: {
    colors: {
      brand: {
        primary: '#daab66', // used like bg-brand-primary
        light: '#80eec0', // used like bg-brand-light
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
