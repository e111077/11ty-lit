import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number }) count = 0;

  render() {

    return html`
      <md-filled-button @click=${() => this.count++}
        >Increment</md-filled-button
      >
      <div>Count: ${this.count}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --md-sys-color-primary: var(--primary-color);
      --md-sys-color-on-primary: var(--on-primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-counter': MyCounter;
  }
}
