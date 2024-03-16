import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/filled-tonal-button.js';

// md-filled-tonal-button is SSR-able, but this is an example on how
// to use a component that you do not want to run through SSR.

@customElement('not-ssrd-component')
export class NotSsrdComponent extends LitElement {
  @property({ type: Number }) count = 0;

  render() {
    return html`
      <md-filled-tonal-button @click=${() => this.count++}
        >Increment</md-filled-tonal-button
      >
      <div>Count: ${this.count}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --md-sys-color-secondary-container: var(--secondary-container);
      --md-sys-color-on-secondary-container: var(--on-secondary-container);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'not-ssrd-component': NotSsrdComponent;
  }
}
