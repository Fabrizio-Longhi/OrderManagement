import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../api/customers";
import { getProducts } from "../../api/products";
import { createOrder } from "../../api/orders";
import "./OrderCreatePage.css";

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default function OrderCreatePage() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<number | "">("");
  const [selectedProduct, setSelectedProduct] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);

  const [items, setItems] = useState<OrderItem[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [cRes, pRes] = await Promise.all([getCustomers(), getProducts()]);
      setCustomers(cRes);
      setProducts(pRes);
    } catch (error) {
      alert("No se pudieron cargar clientes o productos");
    }
  }

  function handleAddItem() {
    if (!selectedProduct || quantity <= 0) return;

    const product = products.find((p) => p.id === Number(selectedProduct));
    if (!product) return;

    if (quantity > product.stock) {
      alert(`Stock insuficiente. Stock disponible: ${product.stock}`);
      return;
    }

    // Ya existe?
    const exists = items.find((i) => i.productId === product.id);
    if (exists) {
      alert("Este producto ya fue agregado");
      return;
    }

    const subtotal = product.price * quantity;

    setItems([
      ...items,
      {
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        quantity,
        subtotal,
      },
    ]);

    setSelectedProduct("");
    setQuantity(1);
  }

  function handleRemoveItem(id: number) {
    setItems(items.filter((i) => i.productId !== id));
  }

  async function handleSubmit() {
    if (!selectedCustomer) {
      alert("Selecciona un cliente");
      return;
    }

    if (items.length === 0) {
      alert("Agrega al menos un producto");
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        customerId: Number(selectedCustomer),
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      });

      alert("Orden creada con éxito");
      navigate("/orders");
    } catch (error: any) {
      alert(error.message || "Error creando orden");
    } finally {
      setLoading(false);
    }
  }

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  return (
    <div className="order-create-container">

      <h1 className="order-title">Nueva Orden</h1>

      <div className="order-form">

        {/* CLIENTE */}
        <div className="form-section">
          <label>Cliente</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
          >
            <option value="">Seleccionar cliente...</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCTO */}
        <div className="product-selector">
          <div>
            <label>Producto</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(Number(e.target.value))}
            >
              <option value="">Seleccionar producto...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (${p.price}) — Stock: {p.stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Cantidad</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button className="btn-add" onClick={handleAddItem}>
            + Agregar
          </button>
        </div>

        {/* ITEMS */}
        <div className="items-table-container">
          <h3>Productos agregados</h3>

          {items.length === 0 ? (
            <p className="empty">No se agregaron productos</p>
          ) : (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.productId}>
                    <td>{i.name}</td>
                    <td>${Number(i.price).toFixed(2)}</td>
                    <td>{i.quantity}</td>
                    <td>${i.subtotal.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveItem(i.productId)}
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* TOTAL */}
        <div className="order-total">
          <h2>Total: ${total.toFixed(2)}</h2>
        </div>

        {/* BOTÓN CREAR */}
        <button
          className="btn-create-order"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Orden"}
        </button>
      </div>

      <button className="btn-back" onClick={() => navigate("/orders")}>
        ← Volver
      </button>
    </div>
  );
}
