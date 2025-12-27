import { Type } from "./action.type.js";

export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        localStorage.setItem(
          "basket",
          JSON.stringify([...state.basket, { ...action.item, amount: 1 }])
        );
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };
    case Type.EMPTY_BASKET:
      localStorage.setItem("basket", JSON.stringify([]));
      return {
        ...state,
        basket: [],
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

