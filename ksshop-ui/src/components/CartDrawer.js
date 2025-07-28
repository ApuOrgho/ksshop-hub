import React from "react";

export default function CartDrawer({ open, onClose, cart, updateQty, removeItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className={`fixed inset-0 z-50 transition-all ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close" className="text-2xl">&times;</button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-neutral-500 mt-12">Your cart is empty.</div>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-6">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-neutral-500 text-sm">${item.price}</div>
                    <div className="flex gap-2 mt-2 items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={e => updateQty(item.id, Number(e.target.value))}
                        className="w-14 border rounded px-2 py-1"
                      />
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline text-sm">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <button className="w-full bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-primary/90 transition">Checkout</button>
        </div>
      </aside>
    </div>
  );
} 