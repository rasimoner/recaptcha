<template>
  <div id="app" ref="recaptchaDiv"/>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

@Component
export default class RecaptchaComponent extends Vue {
  @Prop({required: true}) readonly siteKey?: string;
  @Prop({default: "normal"}) readonly size?: string;
  @Prop({default: "light"}) readonly theme?: string;
  @Prop() readonly hl?: string;

  recaptcha: any = null;

  async mounted() {
    return await this.setRecaptcha();
  }

  async setRecaptcha() {
    if (window.grecaptcha == null)
      return await this.isGoogleRecaptchaNull();
    else
      return this.renderRecaptcha();
  }

  async isGoogleRecaptchaNull() {
    new Promise<void>((resolve) => {
      window.recaptchaReady = function () {
        resolve();
      };
      const doc = window.document;
      const scriptId = "recaptcha-script";
      const scriptTag = doc.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.setAttribute("src", `https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit&hl=${this.hl}`);
      doc.head.appendChild(scriptTag);
    }).then(() => {
      this.renderRecaptcha();
    });
  }

  execute() {
    window.grecaptcha.execute(this.recaptcha)
  }

  reset() {
    window.grecaptcha.execute(this.recaptcha)
  }

  renderRecaptcha() {
    if (!this.siteKey) throw "Site anahtarı alanı zorunludur";

    if (!this.$refs?.recaptchaDiv) return;

    this.recaptcha = window.grecaptcha.render(this.$refs.recaptchaDiv, {
      'sitekey': this.siteKey,
      'theme': this.theme,
      'size': this.size,
      'callback': (response: string) => this.verify(response),
      'expired-callback': () => this.expire(),
      'error-callback': () => this.fail()
    })
  }

  @Emit()
  verify(response: string): boolean {
    return response != null && response != "";
  }

  @Emit()
  expire() {
  }

  @Emit()
  fail() {
  }
}
</script>

<style scoped/>
