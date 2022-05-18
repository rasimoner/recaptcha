declare global {
    interface Window {
        grecaptcha: any,
        recaptchaReady: any
    }
}

import RecaptchaComponent from './Recaptcha.vue'

export default RecaptchaComponent