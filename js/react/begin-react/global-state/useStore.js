import { create } from "zustand";

export const useStore = create((set) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),

  // Cart state
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}));
