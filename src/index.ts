declare global {
  interface Window {
    grecaptcha: any,
    recaptchaReady: any
  }
}

import VueRecaptcha from './VueRecaptcha.vue'
export default VueRecaptcha
