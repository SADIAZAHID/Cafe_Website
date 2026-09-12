import { useState, useEffect } from 'react'
import {
  Sun,
  Moon,
  Coffee,
  Utensils,
  Cake,
  GlassWater,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShoppingBag,
  Plus,
  Check,
  Minus,
  Trash2,
  X,
  Star,
  Award,
  Leaf,
  Home,
  Sparkles,
  Heart,
  Calendar,
  Users,
  CheckCircle,
  ChefHat,
  ChevronRight
} from 'lucide-react'

/* ===== NAVBAR ===== */
export function Navbar({ darkMode, toggleDark, cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Reservation' },
  ]

  useEffect(() => {
    const sectionIds = ['home', 'about', 'menu', 'gallery', 'reviews', 'contact']
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollPos = window.scrollY + 200
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sectionIds[i])
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(sectionIds[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <button
            onClick={() => scrollTo('home')}
            className="nav-logo"
            aria-label="Aroma & Co. Home"
          >
            <div className="logo-badge-icon">
              <Coffee className="logo-coffee-icon" size={24} />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-main">
                Aroma <span>&amp; Co.</span>
              </span>
              <span className="logo-sub">Artisan Cafe &amp; Roastery</span>
            </div>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className={`nav-link ${active === l.id ? 'active' : ''}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="mobile-only-action">
              <button
                className="btn-primary w-full"
                onClick={() => scrollTo('contact')}
              >
                <span>Book a Table</span>
              </button>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              id="cart-toggle-btn"
              className="cart-toggle"
              onClick={onOpenCart}
              aria-label="View Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button
              id="dark-toggle"
              className="dark-toggle"
              onClick={toggleDark}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              className="nav-cta btn-glow"
              onClick={() => scrollTo('contact')}
            >
              Book a Table
            </button>

            <button
              id="hamburger-btn"
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ===== HERO SECTION ===== */
export function Hero({ onOrderClick }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <img src="/hero_coffee.png" alt="Aroma and Co premium atmosphere" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot" />
            <span>Now Open · Mon–Sun 7am–11pm</span>
          </div>
          <h1 className="hero-title">
            <span className="script-line">Welcome to Aroma &amp; Co.</span>
            Where Every <em>Sip</em> Tells<br />a Story
          </h1>
          <p className="hero-desc">
            Discover handcrafted single-origin espresso drinks, artisan pastries, and gourmet chef specials served in a warm, sophisticated atmosphere.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              id="explore-menu-btn"
              onClick={() => scrollTo('menu')}
            >
              <span>Explore Menu</span>
              <ChevronRight size={18} />
            </button>
            <button
              className="btn-secondary"
              id="order-online-hero-btn"
              onClick={onOrderClick}
            >
              <ShoppingBag size={18} />
              <span>Order Online</span>
            </button>
            <button
              className="btn-secondary outline-only"
              id="book-table-btn"
              onClick={() => scrollTo('contact')}
            >
              <span>Book Table</span>
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">15+</span>
              <span className="label">Years Open</span>
            </div>
            <div className="hero-stat">
              <span className="num">24+</span>
              <span className="label">Craft Recipes</span>
            </div>
            <div className="hero-stat">
              <span className="num">50k+</span>
              <span className="label">Happy Guests</span>
            </div>
            <div className="hero-stat">
              <span className="num">4.9★</span>
              <span className="label">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll Down</span>
      </div>
    </section>
  )
}

/* ===== ABOUT SECTION ===== */
export function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-images reveal">
            <div className="about-img-main">
              <img src="/cafe_interior.png" alt="Our cafe interior layout" />
            </div>
            <div className="about-badge">
              <span className="badge-num">15</span>
              <span className="badge-text">
                Years of<br />Excellence
              </span>
            </div>
          </div>

          <div className="about-text reveal reveal-delay-2">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Crafting Memories Over <em>Coffee &amp; Food</em>
            </h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginBottom: '16px' }}>
              Founded in 2009, Aroma &amp; Co. began with a simple commitment: to source ethically grown beans from top small-lot farms across 12 countries and roast them to absolute perfection.
            </p>
            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
              Our award-winning culinary team transforms fresh, locally sourced ingredients into extraordinary dishes—from our famous sourdough avocado smash to rich handcrafted molten lava cakes.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="icon-wrapper">
                  <Leaf className="feature-icon" size={22} />
                </div>
                <div>
                  <h4>Ethically Sourced</h4>
                  <p>Direct trade beans from sustainable fair-trade farms</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="icon-wrapper">
                  <ChefHat className="feature-icon" size={22} />
                </div>
                <div>
                  <h4>Master Baristas</h4>
                  <p>Certified coffee artists dedicated to every cup</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="icon-wrapper">
                  <Home className="feature-icon" size={22} />
                </div>
                <div>
                  <h4>Cozy Ambiance</h4>
                  <p>Modern aesthetic with relaxed seating and fast Wi-Fi</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="icon-wrapper">
                  <Award className="feature-icon" size={22} />
                </div>
                <div>
                  <h4>Award Winning</h4>
                  <p>Voted Best Artisanal Cafe &amp; Bakery 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== MENU DATA ===== */
const menuData = {
  coffee: [
    {
      name: 'Signature Latte',
      desc: 'Double shot of house-blend espresso with velvety steamed milk and Madagascar vanilla bean.',
      price: '$5.50',
      badge: 'Best Seller',
      img: '/latte_art_overlay.png',
    },
    {
      name: 'Flat White',
      desc: 'Rich ristretto shots crowned with microfoam microbubbles for a smooth, bold velvet sip.',
      price: '$5.00',
      badge: 'Staff Pick',
      img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80&fit=crop',
    },
    {
      name: 'Artisan Cold Brew',
      desc: 'Steeped for 20 hours for ultra-smooth, low-acidity dark chocolate and hazelnut notes.',
      price: '$5.75',
      badge: 'Summer Hit',
      img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80&fit=crop',
    },
    {
      name: 'Vanilla Bean Cappuccino',
      desc: 'Espresso topped with thick cloud foam, dusted with organic Ceylon cinnamon.',
      price: '$5.25',
      badge: 'Popular',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80&fit=crop',
    },
    {
      name: 'Caramel Macchiato',
      desc: 'Layered espresso over steamed milk, drizzled with house-made salted caramel sauce.',
      price: '$5.90',
      badge: 'Sweet & Crisp',
      img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80&fit=crop',
    },
    {
      name: 'Double Shot Espresso',
      desc: 'Pure, concentrated single-origin espresso extraction with golden amber crema.',
      price: '$3.75',
      badge: 'Classic',
      img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80&fit=crop',
    },
  ],
  food: [
    {
      name: 'Avocado Smash Toast',
      desc: 'Toasted sourdough, smashed hass avo, organic poached eggs, dukkah spice, and microgreens.',
      price: '$13.50',
      badge: 'Fan Favorite',
      img: '/avocado_toast.png',
    },
    {
      name: 'Double Smash Burger',
      desc: 'Crispy double Angus beef patties, melted aged cheddar, caramelized onion, and special sauce.',
      price: '$16.00',
      badge: "Chef's Special",
      img: '/smash_burger.png',
    },
    {
      name: 'Truffle Mushroom Melt',
      desc: 'Melted Gruyère cheese, sautéed wild mushrooms, and white truffle glaze on toasted brioche.',
      price: '$14.00',
      badge: 'Gourmet',
      img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80&fit=crop',
    },
    {
      name: 'Artisan Club Sandwich',
      desc: 'Smoked turkey breast, crispy maple bacon, butter lettuce, heirloom tomato, and aioli.',
      price: '$14.50',
      badge: 'Hearty',
      img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80&fit=crop',
    },
    {
      name: 'Loaded Truffle Fries',
      desc: 'Crispy hand-cut fries, parmesan reggiano, truffle oil, garlic aioli, and fresh herbs.',
      price: '$9.50',
      badge: 'Sharable',
      img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&q=80&fit=crop',
    },
    {
      name: 'Gourmet Chicken Panini',
      desc: 'Grilled herb chicken breast, fresh basil pesto, mozzarella, and sun-dried tomatoes.',
      price: '$13.90',
      badge: 'Pressed Hot',
      img: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80&fit=crop',
    },
  ],
  desserts: [
    {
      name: 'Molten Lava Cake',
      desc: 'Warm dark chocolate fondant with a flowing molten center, served with vanilla gelato.',
      price: '$9.00',
      badge: 'Must Try',
      img: '/lava_cake.png',
    },
    {
      name: 'Matcha Cheesecake',
      desc: 'Japanese ceremonial Uji matcha blended into creamy New York-style cheesecake.',
      price: '$8.50',
      badge: 'Trending',
      img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&fit=crop',
    },
    {
      name: 'Classic Crème Brûlée',
      desc: 'Rich vanilla custard with a crisp caramelized sugar crust, garnished with fresh berries.',
      price: '$8.00',
      badge: 'French Classic',
      img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80&fit=crop',
    },
    {
      name: 'Espresso Tiramisu',
      desc: 'Layered ladyfingers soaked in dark espresso and Marsala, whipped mascarpone cream.',
      price: '$8.75',
      badge: 'House Favorite',
      img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80&fit=crop',
    },
    {
      name: 'Chocolate Hazelnut Tart',
      desc: 'Rich Belgian chocolate ganache filled tart topped with roasted hazelnuts & sea salt.',
      price: '$8.50',
      badge: 'Decadent',
      img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80&fit=crop',
    },
    {
      name: 'Berry Pistachio Tart',
      desc: 'Flaky pastry shell loaded with fresh organic raspberries, blueberries, and pistachio cream.',
      price: '$8.25',
      badge: 'Fresh & Crisp',
      img: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80&fit=crop',
    },
  ],
  beverages: [
    {
      name: 'Mango Tango Smoothie',
      desc: 'Fresh Alphonso mangoes, passion fruit juice, banana, and organic coconut water.',
      price: '$7.50',
      badge: 'Refreshing',
      img: 'https://images.unsplash.com/photo-1553530666-ba11a90a3dc5?w=800&q=80&fit=crop',
    },
    {
      name: 'Berry Blast Shake',
      desc: 'Blend of wild acai, raspberries, Greek yogurt, almond milk, and raw honey.',
      price: '$7.75',
      badge: 'Antioxidant',
      img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&q=80&fit=crop',
    },
    {
      name: 'Golden Turmeric Latte',
      desc: 'Organic turmeric, fresh ginger, cinnamon, and black pepper infused in oat milk.',
      price: '$6.50',
      badge: 'Wellness',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
    },
    {
      name: 'Iced Peach Tea',
      desc: 'Brewed white tea infused with white peach puree, fresh mint leaves, and ice.',
      price: '$6.00',
      badge: 'Cooler',
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80&fit=crop',
    },
    {
      name: 'Organic Matcha Latte',
      desc: 'Whisked ceremonial green tea with velvety steamed almond milk and agave nectar.',
      price: '$6.75',
      badge: 'Energizing',
      img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80&fit=crop',
    },
    {
      name: 'Fresh Mint Lemonade',
      desc: 'Hand-squeezed Meyer lemons, crushed garden mint, sparkling water, and raw cane sugar.',
      price: '$5.50',
      badge: 'Zesty',
      img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80&fit=crop',
    },
  ],
}

const tabs = [
  { key: 'coffee', label: 'Coffee', icon: Coffee },
  { key: 'food', label: 'Fast Food', icon: Utensils },
  { key: 'desserts', label: 'Desserts', icon: Cake },
  { key: 'beverages', label: 'Beverages', icon: GlassWater },
]

/* ===== MENU SECTION ===== */
export function Menu({ onAddToCart, cartItems }) {
  const [activeTab, setActiveTab] = useState('coffee')
  const [addedAnimation, setAddedAnimation] = useState({})

  const handleAdd = (item) => {
    onAddToCart(item)
    setAddedAnimation((prev) => ({ ...prev, [item.name]: true }))
    setTimeout(
      () => setAddedAnimation((prev) => ({ ...prev, [item.name]: false })),
      1200
    )
  }

  const items = menuData[activeTab]

  return (
    <section id="menu" className="menu">
      <div className="container">
        <div className="menu-header reveal">
          <span className="section-label">Our Handcrafted Menu</span>
          <h2 className="section-title">
            Culinary Excellence in Every <em>Bite &amp; Sip</em>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            From single-origin espresso drinks to artisan burgers and handcrafted desserts, our items are prepared fresh daily using premium ingredients.
          </p>
        </div>

        <div className="menu-tabs reveal">
          {tabs.map((t) => {
            const IconComp = t.icon
            return (
              <button
                key={t.key}
                id={`menu-tab-${t.key}`}
                className={`menu-tab ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <IconComp size={18} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        <div className="menu-grid">
          {items.map((item, i) => {
            const isAdded = addedAnimation[item.name]
            const inCart = cartItems.find((c) => c.name === item.name)

            return (
              <div
                key={item.name + activeTab}
                className={`menu-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <div className="menu-card-img">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&fit=crop'
                    }}
                  />
                  {item.badge && (
                    <span className="card-badge">{item.badge}</span>
                  )}
                </div>

                <div className="menu-card-body">
                  <div className="card-title-row">
                    <h3>{item.name}</h3>
                    <span className="card-price">{item.price}</span>
                  </div>
                  <p>{item.desc}</p>
                  <div className="card-footer">
                    {inCart ? (
                      <span className="in-cart-indicator">
                        <Check size={14} /> {inCart.quantity} in cart
                      </span>
                    ) : (
                      <span className="fresh-prep-tag">Fresh Daily</span>
                    )}

                    <button
                      className={`card-add ${isAdded ? 'added' : ''}`}
                      id={`add-btn-${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleAdd(item)}
                      title="Add to order cart"
                    >
                      {isAdded ? <Check size={18} /> : <Plus size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ===== GALLERY SECTION ===== */
const galleryItems = [
  { label: 'Warm Cafe Ambiance', img: '/cafe_interior.png' },
  { label: 'Artisan Latte Art', img: '/latte_art_overlay.png' },
  {
    label: 'Fresh Baked Croissants',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&fit=crop',
  },
  { label: 'Avocado Toast Perfection', img: '/avocado_toast.png' },
  { label: 'Gourmet Double Smash Burger', img: '/smash_burger.png' },
  { label: 'Molten Lava Cake Gelato', img: '/lava_cake.png' },
  {
    label: 'Precision Cold Brew Bar',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop',
  },
  {
    label: 'Expert Espresso Extraction',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80&fit=crop',
  },
]

export function Gallery({ onOpenLightbox }) {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-header reveal">
          <span className="section-label">Atmosphere &amp; Dishes</span>
          <h2 className="section-title">
            Visual Story of <em>Aroma &amp; Co.</em>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            Click any photo to explore our high-resolution gallery of culinary creations and cozy spaces.
          </p>
        </div>

        <div className="gallery-grid reveal">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => onOpenLightbox(item)}
            >
              <img
                className="g-img"
                src={item.img}
                alt={item.label}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <Sparkles className="gallery-zoom-icon" size={24} />
                <span className="gallery-item-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== TESTIMONIALS SECTION ===== */
const testimonials = [
  {
    text: "Aroma & Co. is hands-down the finest coffee experience in the city. The flat white is smooth, perfectly balanced, and their smash burger is unbelievable!",
    author: "Aisha Rahman",
    role: "Food & Travel Critic",
    stars: 5,
    initials: "AR",
    color: "#c8640a",
  },
  {
    text: "The cozy interior, fast Wi-Fi, and incredible avocado toast make this my favorite spot for work and meetings. The team treats everyone like family.",
    author: "James Thornton",
    role: "Senior Architect",
    stars: 5,
    initials: "JT",
    color: "#4a7c59",
  },
  {
    text: "We hosted a corporate dinner here and everything from the molten lava cakes to table service was 10 out of 10. Truly an exceptional cafe!",
    author: "Priya Malhotra",
    role: "Tech Product Lead",
    stars: 5,
    initials: "PM",
    color: "#6a3a8a",
  },
  {
    text: "The Artisan Cold Brew is the best I've had anywhere — smooth, rich, never bitter. Paired with the matcha cheesecake, it's my perfect afternoon treat.",
    author: "Sadia Zahid",
    role: "Regular Guest",
    stars: 5,
    initials: "SZ",
    color: "#3a6ea5",
  },
]

export function Testimonials() {
  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <div className="testimonials-header reveal">
          <span className="section-label">What Guests Say</span>
          <h2 className="section-title">
            Loved by Coffee &amp; Food <em>Enthusiasts</em>
          </h2>
          <div className="divider" />
        </div>

        <div className="testimonials-track">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card reveal reveal-delay-${i + 1}`}
            >
              <div className="quote-mark">“</div>
              <div className="stars-row">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} size={16} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="author-name">{t.author}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== CONTACT / RESERVATION SECTION ===== */
export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [confirmCode, setConfirmCode] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = 'Enter a valid email address'
    if (!form.phone.match(/^[\d\s\-\+\(\)]{7,}$/))
      e.phone = 'Enter a valid phone number'
    if (!form.date) e.date = 'Select reservation date'
    if (!form.time) e.time = 'Select reservation time'
    if (!form.guests) e.guests = 'Select number of guests'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setConfirmCode('ARM-' + Math.floor(10000 + Math.random() * 90000))
    setSubmitted(true)
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev }
        delete n[field]
        return n
      })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <span className="section-label">Reservations &amp; Info</span>
            <h2 className="section-title">
              Reserve Your <em>Table</em>
            </h2>
            <div className="divider" />
            <p className="section-subtitle">
              Planning a breakfast meet, lunch date, or weekend gathering? Reserve your table in advance and let our baristas and chefs prepare a personalized experience.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <div className="contact-item-value">
                    24 Espresso Lane, Coffee Quarter
                    <br />
                    New York, NY 10001
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="contact-item-label">Direct Phone</div>
                  <div className="contact-item-value">+1 (212) 555-0182</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="contact-item-label">Email Enquiries</div>
                  <div className="contact-item-value">hello@aromaandco.com</div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="contact-item-label">Opening Hours</div>
                  <div className="contact-item-value">
                    Mon–Fri: 7:00 AM – 10:00 PM
                    <br />
                    Sat–Sun: 8:00 AM – 11:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper reveal reveal-delay-2">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon-badge">
                  <CheckCircle size={48} color="#34cc57" />
                </div>
                <h4>Table Reserved Successfully!</h4>
                <p>
                  Thank you, <strong>{form.name}</strong>! We have confirmed your reservation for <strong>{form.guests} guests</strong> on <strong>{form.date}</strong> at <strong>{form.time}</strong>.
                </p>
                <div className="res-confirmation-code">
                  Confirmation Code: <span>#{confirmCode}</span>
                </div>
                <button
                  className="btn-primary mt-4"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                      time: '',
                      guests: '',
                      message: '',
                    })
                  }}
                >
                  <span>Book Another Table</span>
                </button>
              </div>
            ) : (
              <>
                <h3>Online Table Reservation</h3>
                <form id="reservation-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="res-name">Full Name *</label>
                      <input
                        id="res-name"
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange('name')}
                      />
                      {errors.name && (
                        <span className="error-msg">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="res-email">Email Address *</label>
                      <input
                        id="res-email"
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={handleChange('email')}
                      />
                      {errors.email && (
                        <span className="error-msg">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="res-phone">Phone Number *</label>
                      <input
                        id="res-phone"
                        type="tel"
                        placeholder="+1 (555) 019-2831"
                        value={form.phone}
                        onChange={handleChange('phone')}
                      />
                      {errors.phone && (
                        <span className="error-msg">{errors.phone}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="res-guests">Number of Guests *</label>
                      <select
                        id="res-guests"
                        value={form.guests}
                        onChange={handleChange('guests')}
                      >
                        <option value="">Select guests count</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value="9+">9+ (Large Party Event)</option>
                      </select>
                      {errors.guests && (
                        <span className="error-msg">{errors.guests}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="res-date">Date *</label>
                      <input
                        id="res-date"
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleChange('date')}
                      />
                      {errors.date && (
                        <span className="error-msg">{errors.date}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="res-time">Preferred Time *</label>
                      <select
                        id="res-time"
                        value={form.time}
                        onChange={handleChange('time')}
                      >
                        <option value="">Select time slot</option>
                        {[
                          '8:00 AM',
                          '9:00 AM',
                          '10:00 AM',
                          '11:00 AM',
                          '12:00 PM',
                          '1:00 PM',
                          '2:00 PM',
                          '3:00 PM',
                          '5:00 PM',
                          '6:00 PM',
                          '7:00 PM',
                          '8:00 PM',
                          '9:00 PM',
                        ].map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <span className="error-msg">{errors.time}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="res-message">Special Requests / Dietary Notes</label>
                    <textarea
                      id="res-message"
                      placeholder="e.g. Window seat, anniversary celebration, vegan or gluten-free preferences..."
                      value={form.message}
                      onChange={handleChange('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-reservation"
                    className="btn-primary form-submit"
                  >
                    <span>Confirm Table Reservation</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===== CART DRAWER COMPONENT ===== */
export function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  subtotal,
  onProceedCheckout,
}) {
  // Lock background scroll while the cart is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={22} />
            <h3>Your Order Cart</h3>
            <span className="cart-item-count">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <Coffee size={48} className="empty-cart-icon" />
              <p>Your cart is empty.</p>
              <span className="sub-text">
                Browse our handcrafted menu and add your favorite items!
              </span>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.name} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">{item.price}</span>
                    <div className="cart-qty-controls">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="cart-remove-btn"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal:</span>
              <span className="summary-price">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row tax-row">
              <span>Estimated Tax (8%):</span>
              <span>${(subtotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="cart-summary-row total-row">
              <span>Total:</span>
              <span className="final-total-price">
                ${(subtotal * 1.08).toFixed(2)}
              </span>
            </div>

            <button
              className="btn-primary w-full checkout-btn"
              onClick={onProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ===== CHECKOUT MODAL COMPONENT ===== */
export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  onOrderSuccess,
}) {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', notes: '' })
  const [placed, setPlaced] = useState(false)
  const [error, setError] = useState('')
  const [orderNum, setOrderNum] = useState('')
  const [finalTotal, setFinalTotal] = useState(0)

  // Lock background scroll while checkout is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen)
    if (isOpen) {
      setPlaced(false)
      setError('')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])

  if (!isOpen) return null

  const tax = subtotal * 0.08
  const grandTotal = subtotal + tax

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!customer.name.trim() || !customer.phone.trim()) {
      setError('Please provide your Name and Phone number.')
      return
    }
    setFinalTotal(grandTotal)
    setOrderNum('ARM-ORD-' + Math.floor(10000 + Math.random() * 90000))
    setPlaced(true)
    onOrderSuccess()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {placed ? (
          <div className="order-success-modal">
            <CheckCircle size={56} color="#34cc57" />
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you, <strong>{customer.name}</strong>! Your order is being freshly prepared by our baristas and chefs.
            </p>
            <div className="order-details-box">
              <p>Order #: <span>{orderNum}</span></p>
              <p>Total Paid: <span>${finalTotal.toFixed(2)}</span></p>
              <p>Estimated Prep Time: <span>15–20 Mins</span></p>
            </div>
            <button className="btn-primary mt-4" onClick={onClose}>
              <span>Back to Cafe</span>
            </button>
          </div>
        ) : (
          <div>
            <h2>Complete Online Order</h2>
            <p className="modal-subtitle">
              Provide delivery/pickup details to confirm your order.
            </p>

            <form onSubmit={handlePlaceOrder} className="checkout-form">
              {error && <div className="form-error-banner">{error}</div>}

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 012-3456"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Delivery / Pickup Address</label>
                <input
                  type="text"
                  placeholder="Table #4 OR 123 Main St, NYC"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  placeholder="Extra sugar, milk preference, cutlery request..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                />
              </div>

              <div className="order-summary-minibox">
                <div className="minibox-row">
                  <span>Items Count:</span>
                  <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                </div>
                <div className="minibox-row">
                  <span>Grand Total (incl. tax):</span>
                  <strong>${grandTotal.toFixed(2)}</strong>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-4">
                <span>Confirm &amp; Place Order</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

/* ===== GALLERY LIGHTBOX MODAL ===== */
export function GalleryLightbox({ image, onClose }) {
  // Lock background scroll while the lightbox is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', !!image)
    return () => document.body.classList.remove('no-scroll')
  }, [image])

  if (!image) return null

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close photo">
          <X size={24} />
        </button>
        <img src={image.img} alt={image.label} className="lightbox-img" />
        <div className="lightbox-caption">{image.label}</div>
      </div>
    </div>
  )
}

/* ===== FOOTER ===== */
export function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Coffee className="footer-coffee-icon" size={24} />
              <span>Aroma <span>&amp; Co.</span></span>
            </div>
            <div className="footer-tagline">Where every sip tells a story</div>
            <p>
              Dedicated to craft roasted coffee, fresh gourmet breakfast, handcrafted pastries, and creating memorable moments for our community.
            </p>
            <div className="footer-socials">
              <a href="#twitter" className="social-btn" aria-label="Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#instagram" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="#facebook" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#linkedin" className="social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <div className="footer-links">
              {[
                ['home', 'Home'],
                ['about', 'About Us'],
                ['menu', 'Our Menu'],
                ['gallery', 'Gallery'],
                ['reviews', 'Customer Reviews'],
                ['contact', 'Book a Table'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className="footer-link-btn"
                  onClick={() => scrollTo(id)}
                >
                  <ChevronRight size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Menu Highlights</h4>
            <div className="footer-links">
              <span>Signature Espresso &amp; Lattes</span>
              <span>Double Smash Angus Burgers</span>
              <span>Avocado Sourdough Toast</span>
              <span>Molten Chocolate Lava Cakes</span>
              <span>Japanese Matcha Cheesecake</span>
              <span>Organic Cold Brew &amp; Teas</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Opening Hours</h4>
            <div className="footer-hours">
              {[
                ['Mon – Fri', '7:00 AM – 10:00 PM'],
                ['Saturday', '8:00 AM – 11:00 PM'],
                ['Sunday', '8:00 AM – 11:00 PM'],
                ['Holidays', '8:00 AM – 9:00 PM'],
              ].map(([day, time]) => (
                <div key={day} className="hours-row">
                  <span className="day">{day}</span>
                  <span className="open">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 <span>Aroma &amp; Co. Cafe</span>. All rights reserved.</p>
          <div className="footer-credit-row">
            <span>Crafted with</span>
            <Heart size={14} color="#e07b20" fill="#e07b20" />
            <span>&amp;</span>
            <Coffee size={14} color="#d4a44c" />
            <span>in New York City</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ===== SCROLL REVEAL HOOK ===== */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.08 }
    )

    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
    }

    observeElements()

    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
