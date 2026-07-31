# Fase 08 — Cart y Checkout (Store en Unified)

Archivos en Unified:

| Página/Componente | Ruta |
|-------------------|------|
| CartPage | `magna-page/unified/src/store-pages/pages/CartPage.tsx` |
| CheckoutSteps | `magna-page/unified/src/store-pages/components/CheckoutSteps.tsx` |
| ShippingAddress | `magna-page/unified/src/store-pages/pages/ShippingAddressPage.tsx` |
| PaymentMethod | `magna-page/unified/src/store-pages/pages/PaymentMethodPage.tsx` |
| PlaceOrder | `magna-page/unified/src/store-pages/pages/PlaceOrderPage.tsx` |
| OrderPage | `magna-page/unified/src/store-pages/pages/OrderPage.tsx` |
| OrderHistory | `magna-page/unified/src/store-pages/pages/OrderHistoryPage.tsx` |

Skills: `frontend-design`

### Principios

- Tabla responsive con miniatura de producto
- Resumen sticky en desktop
- CheckoutSteps con borde inferior (activo = `--color-secondary`)
- Textos 100% en español
- Botones con `--color-secondary`
- Precios en formato COP
- Helmet con titles en español
- framer-motion transiciones

### Checklist de textos a traducir

| Original | → Español |
|----------|-----------|
| Shopping Cart | Carrito de compras |
| Sign Out | Cerrar sesión |
| Proceed to Checkout | Finalizar compra |
| Place Order | Confirmar pedido |
| Order History | Historial de pedidos |
| Shipping Address | Dirección de envío |
| Payment Method | Método de pago |

### Tests

- [ ] Carrito: +/-/eliminar funciona
- [ ] CheckoutSteps marca paso activo
- [ ] PayPal checkout funcional
- [ ] Textos en español en todas las páginas
- [ ] Build exitoso
