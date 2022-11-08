import {component} from '@11ty/is-land';

class LitIsland extends component {
  // override this because it messes with declarative shadow DOM
  async forceFallback() {};
}

customElements.define('lit-island', LitIsland);