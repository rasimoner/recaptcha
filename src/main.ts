import Vue from 'vue'
import Recaptcha from './Recaptcha.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(Recaptcha)
}).$mount('#app')
