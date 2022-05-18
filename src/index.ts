declare global {
  interface Window {
    grecaptcha: any,
    recaptchaReady: any
  }
}

import App from './App.vue'
export default App
