import { Island } from '@11ty/is-land';

customElements.define(
  'lit-island',
  class extends Island {
    // Removes the feature in which 11ty island removes DOM to render a fallback.
    override forceFallback() {}
  }
);
