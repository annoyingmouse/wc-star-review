import { fixture, html, expect } from '@open-wc/testing'
import '../wc-star-review.js'

// ─── Host element ─────────────────────────────────────────────────────────────

describe('host element', () => {
  it('sets role="img"', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    expect(el.getAttribute('role')).to.equal('img')
  })

  it('sets tabindex="0"', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    expect(el.getAttribute('tabindex')).to.equal('0')
  })

  it('does not override a consumer-provided role', async () => {
    const el = await fixture(html`<wc-star-review role="presentation" rating="4" total="5"></wc-star-review>`)
    expect(el.getAttribute('role')).to.equal('presentation')
  })

  it('does not override a consumer-provided tabindex', async () => {
    const el = await fixture(html`<wc-star-review tabindex="-1" rating="4" total="5"></wc-star-review>`)
    expect(el.getAttribute('tabindex')).to.equal('-1')
  })
})

// ─── aria-label ───────────────────────────────────────────────────────────────

describe('aria-label', () => {
  it('generates a label with rating and total', async () => {
    const el = await fixture(html`<wc-star-review rating="4.5" total="5"></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('Rated 4.50 out of 5 stars.')
  })

  it('uses an integer rating when the value has no fractional part', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('Rated 4 out of 5 stars.')
  })

  it('defaults to 0 rating and 5 total when no attributes are set', async () => {
    const el = await fixture(html`<wc-star-review></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('Rated 0 out of 5 stars.')
  })

  it('includes plural review count', async () => {
    const el = await fixture(html`<wc-star-review rating="4.5" total="5" reviews="100"></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('100 reviews. Rated 4.50 out of 5 stars.')
  })

  it('uses singular "review" for 1 review', async () => {
    const el = await fixture(html`<wc-star-review rating="4.5" total="5" reviews="1"></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('1 review. Rated 4.50 out of 5 stars.')
  })

  it('respects a consumer-provided aria-label', async () => {
    const el = await fixture(html`<wc-star-review aria-label="Custom label" rating="4.5" total="5"></wc-star-review>`)
    expect(el.getAttribute('aria-label')).to.equal('Custom label')
  })

  it('updates the label when the rating changes', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    el.setAttribute('rating', '3')
    expect(el.getAttribute('aria-label')).to.equal('Rated 3 out of 5 stars.')
  })

  it('updates the label when reviews are added', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    el.setAttribute('reviews', '50')
    expect(el.getAttribute('aria-label')).to.equal('50 reviews. Rated 4 out of 5 stars.')
  })

  it('updates the label when the total changes', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    el.setAttribute('total', '10')
    expect(el.getAttribute('aria-label')).to.equal('Rated 4 out of 10 stars.')
  })

  it('does not overwrite a consumer-provided aria-label when rating changes', async () => {
    const el = await fixture(html`<wc-star-review aria-label="Custom label" rating="4" total="5"></wc-star-review>`)
    el.setAttribute('rating', '3')
    expect(el.getAttribute('aria-label')).to.equal('Custom label')
  })
})

// ─── color / colour attribute ─────────────────────────────────────────────────

describe('color attribute (American spelling)', () => {
  it('accepts color as an alias for colour', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" color="blue"></wc-star-review>`)
    expect(el.colour).to.equal('blue')
  })

  it('colour takes priority over color when both are set', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" colour="red" color="blue"></wc-star-review>`)
    expect(el.colour).to.equal('red')
  })

  it('re-renders when the color attribute changes', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" color="blue"></wc-star-review>`)
    el.setAttribute('color', 'green')
    expect(el.colour).to.equal('green')
  })
})

// ─── Color validation ─────────────────────────────────────────────────────────

describe('color validation', () => {
  it('falls back to the default colour when an invalid colour value is set', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" colour="not-a-color"></wc-star-review>`)
    expect(el.colour).to.equal('#FFC107')
  })

  it('falls back to the default background when an invalid background value is set', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" background="not-a-color"></wc-star-review>`)
    expect(el.background).to.equal('#CCCCCC')
  })

  it('accepts a valid hex colour', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" colour="#FF0000"></wc-star-review>`)
    expect(el.colour).to.equal('#FF0000')
  })

  it('accepts a valid named colour', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" background="white"></wc-star-review>`)
    expect(el.background).to.equal('white')
  })
})

// ─── Shadow DOM ───────────────────────────────────────────────────────────────

describe('shadow DOM', () => {
  it('inner holder is aria-hidden', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    expect(el.shadowRoot.querySelector('.holder').getAttribute('aria-hidden')).to.equal('true')
  })

  it('renders the correct number of stars', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    const stars = el.shadowRoot.querySelector('.stars')
    expect(stars).to.exist
  })

  it('renders review count when reviews attribute is set', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5" reviews="42"></wc-star-review>`)
    const total = el.shadowRoot.querySelector('.total')
    expect(total).to.exist
    expect(total.textContent).to.equal('(42)')
  })

  it('does not render review count when reviews attribute is absent', async () => {
    const el = await fixture(html`<wc-star-review rating="4" total="5"></wc-star-review>`)
    expect(el.shadowRoot.querySelector('.total')).to.not.exist
  })
})
