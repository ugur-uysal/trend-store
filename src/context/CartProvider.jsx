import { useReducer } from "react";
import { CartContext } from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      let updatedItems = [...state.items];

      if (existingCartItemIndex !== -1) {
        state.items[existingCartItemIndex] = {
          ...state.items[existingCartItemIndex],
          amount:
            state.items[existingCartItemIndex].amount + action.item.amount,
        };
      } else updatedItems = [...state.items, action.item];

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    }
    case "REMOVE": {
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      const itemToRemove = state.items.find((item) => item.id === action.id);

      return {
        items: filteredItems,
        totalAmount:
          state.totalAmount - itemToRemove.price * itemToRemove.amount,
      };
    }
    case "CLEAR":
      return defaultCartState;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cardContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (product) => {
      dispatchCartAction({ item: product, type: "ADD" });
    },
    removeItem: (id) => {
      dispatchCartAction({ id, type: "REMOVE" });
    },
    clearItem: () => {
      dispatchCartAction({ type: "CLEAR" });
    },
  };
  return (
    <CartContext.Provider value={cardContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
