import { useEffect, useMemo, useState } from 'react'

const CATALOG_API = 'http://localhost:8084'
const ORDER_API = 'http://localhost:8085'
const PAYMENT_API = 'http://localhost:8086'

const categories = [
  { name: 'All', icon: '✦' },
  { name: 'Maharashtrian', icon: '🥘' },
  { name: 'Breakfast', icon: '☀️' },
  { name: 'Street Food', icon: '🌶️' },
  { name: 'Thalis & Meals', icon: '🍱' },
  { name: 'Rice & Biryani', icon: '🍚' },
  { name: 'South Indian', icon: '🥞' },
  { name: 'Drinks & Sweets', icon: '🥤' },
]

const categoryFor = (name = '') => {
  const n = name.toLowerCase()
  if (/vada pav|misal|poha|sabudana|kothimbir|kanda bhaji|thalipeeth|batata vada|pakoda|puri bhaji|usal|zunka|pithla|bharli|shev bhaji|matki|vangyache|kombdi|sol kadhi|taak|kokum|puran poli/.test(n)) return 'Maharashtrian'
  if (/upma|sheera|idli|medu vada|dosa|uttapam/.test(n)) return 'Breakfast'
  if (/pav bhaji|dabeli|bhel|sandwich|sev puri|pani puri|ragda|masala pav/.test(n)) return 'Street Food'
  if (/thali|rassa/.test(n)) return 'Thalis & Meals'
  if (/biryani|rice|khichdi|pulao|masale bhat/.test(n)) return 'Rice & Biryani'
  if (/lassi|sharbat|gulab|shrikhand|basundi/.test(n)) return 'Drinks & Sweets'
  return 'Maharashtrian'
}

const descriptions = {
  'Vada Pav': 'Mumbai’s much-loved potato vada, tucked into a soft pav with chutneys.',
  'Misal Pav': 'A spicy sprouted-matki curry finished with farsan, onion and lemon.',
  'Kanda Poha': 'A light breakfast favourite with onion, curry leaves and a squeeze of lemon.',
  'Sabudana Khichdi': 'Pearl tapioca tossed with roasted peanuts, potato and gentle spices.',
  'Pav Bhaji': 'A buttery vegetable mash served with toasted pav and fresh lemon.',
  'Thalipeeth': 'Traditional multigrain flatbread, best enjoyed with curd and pickle.',
  'Zunka Bhakri': 'Rustic gram-flour zunka paired with traditional bhakri.',
  'Pithla Bhakri': 'Comforting Maharashtrian pithla with bhakri.',
  'Sol Kadhi': 'A refreshing kokum and coconut drink, served chilled.',
  'Kokum Sharbat': 'Sweet-tart kokum cooler for a refreshing finish.',
  'Puran Poli': 'A festive sweet flatbread filled with chana dal and jaggery.',
}

const vegetarian = name => !/chicken|mutton|kombdi/i.test(name || '')
const money = value => `₹${Number(value || 0).toFixed(0)}`

export default function App() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [quantities, setQuantities] = useState({})
  const [cart, setCart] = useState([])
  const [notice, setNotice] = useState('Loading today’s menu…')
  const [busy, setBusy] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  async function loadData() {
    try {
      const [menuResponse, orderResponse] = await Promise.all([
        fetch(`${CATALOG_API}/api/products`),
        fetch(`${ORDER_API}/api/orders`),
      ])
      if (!menuResponse.ok) throw new Error('Menu service is not responding')
      const menu = await menuResponse.json()
      setProducts(menu)
      if (orderResponse.ok) setOrders(await orderResponse.json())
      setNotice('Freshly prepared favourites · Online ordering demo is available')
    } catch (error) {
      setNotice(`${error.message}. Please check that the restaurant services are running.`)
    }
  }

  useEffect(() => { loadData() }, [])

  const visibleProducts = useMemo(() => products.filter(product => {
    const matchesCategory = activeCategory === 'All' || categoryFor(product.name) === activeCategory
    const matchesSearch = (product.name || '').toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [products, activeCategory, search])

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  function addToCart(product) {
    const quantity = Number(quantities[product.id] || 1)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      setNotice('Please choose a quantity between 1 and 20.')
      return
    }
    setCart(current => {
      const found = current.find(item => item.id === product.id)
      return found
        ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    setNotice(`${product.name} added to your family table.`)
  }

  async function placeOrder() {
    if (!customerName.trim()) {
      setNotice('Please enter your name before placing an order.')
      document.getElementById('customer-name')?.focus()
      return
    }
    if (!cart.length) {
      setNotice('Your cart is empty. Add a dish from our menu first.')
      return
    }
    setBusy(true)
    try {
      for (const item of cart) {
        const orderResponse = await fetch(`${ORDER_API}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerName: customerName.trim(), productId: item.id, quantity: item.quantity }),
        })
        const order = await orderResponse.json()
        if (!orderResponse.ok) throw new Error(order.error || `Could not place ${item.name}`)
        const paymentResponse = await fetch(`${PAYMENT_API}/api/payments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id, amount: order.totalAmount, method: 'DEMO' }),
        })
        const payment = await paymentResponse.json()
        if (!paymentResponse.ok) throw new Error(payment.error || 'Demo payment failed')
      }
      setCart([])
      setNotice('Thank you! Your order has been submitted. Payment is simulated for this demo.')
      await loadData()
    } catch (error) {
      setNotice(error.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="restaurant">
      <div className="announcement"><span>नमस्कार! स्वागत आहे</span><span>Homestyle Maharashtrian food · Made for sharing</span><span>Open for orders today</span></div>
      <header className="header">
        <a className="brand" href="#home" aria-label="Viraj Family Restaurant home">
          <span className="brand-symbol">वि</span>
          <span className="brand-copy"><strong>VIRAJ</strong><small>FAMILY RESTAURANT</small></span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">☰</button>
        <nav className={mobileMenu ? 'nav open' : 'nav'}>
          <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>Our Menu</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our Story</a>
          <a href="#orders" onClick={() => setMobileMenu(false)}>My Orders</a>
        </nav>
        <a className="header-cta" href="#menu">Order food <span>↗</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="kicker"><span /> THE HEART OF MAHARASHTRIAN HOSPITALITY</div>
            <h1>आपुलकीची चव.<br /><em>A taste of home.</em></h1>
            <p className="hero-lead">From the first bite of a spicy Misal Pav to a comforting family thali, bring everyone together over food made with warmth.</p>
            <div className="hero-actions"><a className="primary-btn" href="#menu">Explore the menu <span>→</span></a><a className="text-link" href="#story">Discover our story</a></div>
            <div className="hero-trust"><span>✦</span> Maharashtrian favourites <i /> Family-style meals <i /> Made for sharing</div>
          </div>
          <div className="hero-visual">
            <div className="hero-image"><img src="/images/vada-pav.png" alt="Fresh Maharashtrian vada pav with chutney" /></div>
            <div className="hero-stamp"><span>घरची</span><strong>चव</strong><small>HOMELY TASTE</small></div>
            <div className="hero-caption"><strong>Our kind of comfort food</strong><span>Fresh • Familiar • Full of flavour</span></div>
          </div>
          <div className="hero-bottom"><span>01 / 03</span><span>GOOD FOOD. GOOD PEOPLE. GOOD TIMES.</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="promise-strip" aria-label="Restaurant highlights">
          <div><span>✿</span><p><strong>Local favourites</strong><small>Beloved Maharashtrian dishes</small></p></div>
          <div><span>♨</span><p><strong>Comfort in every bite</strong><small>Food for everyday moments</small></p></div>
          <div><span>♡</span><p><strong>Made for families</strong><small>Plates worth sharing</small></p></div>
          <div><span>☼</span><p><strong>A warm welcome</strong><small>Come hungry, leave happy</small></p></div>
        </section>

        <section className="story section-pad" id="story">
          <div className="story-image"><img src="/images/vada-pav.png" alt="A Maharashtrian street-food favourite" /><span>THE TASTE OF MAHARASHTRA</span></div>
          <div className="story-copy"><div className="section-kicker">A TABLE FOR EVERYONE</div><h2>Good food has a way of bringing us <em>closer.</em></h2><p>At Viraj, the menu celebrates the flavours we grew up with — familiar snacks, hearty meals, festive sweets and refreshing drinks. Whether it’s a quick bite or a meal with the whole family, there’s always room at the table.</p><a href="#menu" className="under-link">Find your favourite <span>→</span></a></div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="section-top"><div><div className="section-kicker">STRAIGHT FROM OUR KITCHEN</div><h2>Something delicious <em>for everyone.</em></h2><p>Explore familiar flavours, from quick snacks to satisfying family meals.</p></div><div className="menu-count">{products.length || '—'}<small>MENU ITEMS</small></div></div>
          <div className="menu-tools">
            <div className="category-tabs">{categories.map(category => <button key={category.name} className={activeCategory === category.name ? 'selected' : ''} onClick={() => setActiveCategory(category.name)}><span>{category.icon}</span>{category.name}</button>)}</div>
            <label className="search-box"><span>⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a dish…" /></label>
          </div>
          <div className="menu-grid">
            {visibleProducts.map((product, index) => (
              <article className="menu-card" key={product.id}>
                <div className={`food-art food-art-${index % 6}`}>
                  <span className="food-emoji">{({ 'Vada Pav':'🍔','Misal Pav':'🍲','Kanda Poha':'🥣','Pav Bhaji':'🍛','Sabudana Khichdi':'🥘','Thalipeeth':'🫓','Veg Thali':'🍱','Chicken Thali':'🍗','Sol Kadhi':'🥛','Puran Poli':'🫓' })[product.name] || '🍽️'}</span>
                  <span className="food-category">{categoryFor(product.name)}</span>
                </div>
                <div className="menu-card-body">
                  <div className="dish-heading"><h3>{product.name}</h3><strong>{money(product.price)}</strong></div>
                  <p>{descriptions[product.name] || product.description || 'A much-loved favourite, prepared in a homestyle style with traditional flavours.'}</p>
                  <div className="dish-meta"><span className={vegetarian(product.name) ? 'veg-dot' : 'nonveg-dot'}>{vegetarian(product.name) ? '● Vegetarian' : '● Non-vegetarian'}</span><span>Freshly prepared</span></div>
                  <div className="card-actions"><label>Qty <input type="number" min="1" max="20" value={quantities[product.id] || 1} onChange={event => setQuantities({ ...quantities, [product.id]: event.target.value })} /></label><button onClick={() => addToCart(product)} disabled={!product.available}>Add to order <span>＋</span></button></div>
                </div>
              </article>
            ))}
          </div>
          {!visibleProducts.length && <div className="empty-state">No dishes found. Try another category or search term.</div>}
          <p className="sample-note">Learning-project menu: prices, descriptions, ingredients and availability are illustrative. Confirm all details with the restaurant before public use.</p>
        </section>

        <section className="family-banner">
          <div><div className="section-kicker">THE BEST MOMENTS HAPPEN AROUND THE TABLE</div><h2>Bring your appetite.<br /><em>We’ll bring the warmth.</em></h2><a href="#menu" className="light-btn">Order your favourites <span>→</span></a></div>
          <div className="banner-mark">वि<span>✦</span></div>
        </section>

        <section className="cart-orders section-pad" id="orders">
          <div className="section-top"><div><div className="section-kicker">A LITTLE SOMETHING FOR YOU</div><h2>Your family <em>table.</em></h2><p>Review your selections and submit a demo order.</p></div><div className="cart-badge">🛍 <strong>{cartCount}</strong> items</div></div>
          <div className="order-layout">
            <div className="cart-panel">
              <div className="panel-title"><h3>Your order basket</h3><span>{cartCount} items</span></div>
              {!cart.length ? <div className="cart-empty"><span>🥘</span><strong>Your basket is waiting.</strong><p>Add a few favourites from our menu to get started.</p><a href="#menu">Browse menu →</a></div> : <>
                {cart.map(item => <div className="cart-line" key={item.id}><div><strong>{item.name}</strong><small>{item.quantity} × {money(item.price)}</small></div><b>{money(item.quantity * Number(item.price))}</b><button onClick={() => setCart(cart.filter(entry => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></div>)}
                <div className="cart-total"><span>Estimated total</span><strong>{money(cartTotal)}</strong></div>
                <label className="name-field">Your name<input id="customer-name" value={customerName} onChange={event => setCustomerName(event.target.value)} placeholder="Enter your name" /></label>
                <button className="checkout-btn" onClick={placeOrder} disabled={busy}>{busy ? 'Submitting…' : 'Place demo order'} <span>→</span></button>
                <small className="demo-note">Demo checkout only. No real payment will be collected.</small>
              </>}
            </div>
            <div className="recent-panel">
              <div className="panel-title"><h3>Recent orders</h3><button onClick={loadData}>Refresh ↻</button></div>
              <p className="notice" aria-live="polite">{notice}</p>
              {!orders.length ? <div className="cart-empty compact"><span>♡</span><strong>No orders just yet</strong><p>Your placed orders will appear here.</p></div> : <div className="orders-list">{[...orders].reverse().slice(0, 8).map(order => <div className="order-line" key={order.id}><span className="order-number">#{order.id}</span><div><strong>{order.productName}</strong><small>{order.customerName} · Qty {order.quantity}</small></div><b>{money(order.totalAmount)}</b><em>{order.status}</em></div>)}</div>}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main"><div className="footer-brand"><span className="brand-symbol">वि</span><div><strong>VIRAJ</strong><small>FAMILY RESTAURANT</small></div></div><p>स्वाद महाराष्ट्राचा — a little taste of home, served with warmth.</p><a href="#home">Back to top ↑</a></div>
        <div className="footer-bottom"><span>© 2026 Viraj Family Restaurant · Learning project</span><span>Sample menu · Demo ordering · Simulated payments</span></div>
      </footer>
    </div>
  )
}
