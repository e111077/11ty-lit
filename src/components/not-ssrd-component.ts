import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/mwc-button';

// mwc-button is unfortunately not SSR-able so this is an example on how
// to use a component that is not SSR-able.

@customElement('not-ssrd-component')
export class NotSsrdComponent extends LitElement {
  @property({type: Number}) count = 0;

  render() {
    return html`
      <mwc-button @click=${() => this.count++}>Increment</mwc-button>
      <div>Count: ${this.count}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    mwc-button {
      --mdc-theme-primary: var(--primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'not-ssrd-component': NotSsrdComponent;
  }
}