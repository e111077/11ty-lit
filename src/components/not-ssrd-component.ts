import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/button/tonal-button.js';

// mwc-button is unfortunately not SSR-able so this is an example on how
// to use a component that is not SSR-able.

@customElement('not-ssrd-component')
export class NotSsrdComponent extends LitElement {
  @property({type: Number}) count = 0;

  render() {
    return html`
      <md-tonal-button @click=${() => this.count++}>Increment</md-tonal-button>
      <div>Count: ${this.count}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    md-tonal-button {
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