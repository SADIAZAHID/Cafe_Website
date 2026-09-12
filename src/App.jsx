import { useState, useEffect } from 'react'
import { 
  Navbar, 
  Hero, 
  About, 
  Menu, 
  Gallery, 
  Testimonials, 
  Contact, 
  Footer, 
  CartDrawer, 
  GalleryLightbox,
  CheckoutModal,
  useScrollReveal 
} from './components.jsx'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode)
  }, [darkMode])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false)
        setIsCheckoutOpen(false)
        setLightboxImg(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useScrollReveal()

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.name === item.name)
      if (existing) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (itemName, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.name === itemName) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName))
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return sum + priceNum * item.quantity
  }, 0)

  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleDark={() => setDarkMode((d) => !d)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero onOrderClick={() => setIsCartOpen(true)} />
        <About />
        <Menu onAddToCart={addToCart} cartItems={cart} />
        <Gallery onOpenLightbox={(img) => setLightboxImg(img)} />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        subtotal={cartSubtotal}
        onProceedCheckout={() => {
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartSubtotal}
        onOrderSuccess={() => {
          setCart([])
          setOrderConfirmed(true)
        }}
      />

      <GalleryLightbox
        image={lightboxImg}
        onClose={() => setLightboxImg(null)}
      />
    </>
  )
}
