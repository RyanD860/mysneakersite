import axios from "axios";

// CONSTANTS

const GET_SNEAKERS = "GET_SNEAKERS";
const GET_SNEAKER = "GET_SNEAKER";
const GET_STOCK = "GET_STOCK";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CHECKOUT = "CHECKOUT";
const GET_PURCHASES = "GET_PURCHASES";

//ACTION CREATORS

export function getSneakers() {
  return {
    type: "GET_SNEAKERS",
    payload: axios
      .get("/api/sneakers")
      .then(response => {
        return response.data;
      })
      .catch(console.log())
  };
}

export function getSneaker(id) {
  return {
    type: "GET_SNEAKER",
    payload: axios.get(`/api/sneaker/${id}`).then(response => {
      return response.data;
    })
  };
}

export function getStock(id) {
  return {
    type: "GET_STOCK",
    payload: axios
      .get(`/api/stock/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(console.log())
  };
}

export function getUser(id) {
  return {
    type: "GET_USER",
    payload: axios
      .get(`/api/user/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(console.log())
  };
}

export function logOut() {
  return {
    type: "LOGOUT",
    payload: axios
      .get("/api/logout")
      .then(response => {
        return response;
      })
      .catch(console.log)
  };
}

export function addToCart(sku) {
  return {
    type: "ADD_TO_CART",
    payload: axios
      .post("/api/cart/add", { sku: sku })
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function removeFromCart(i, item) {
  return {
    type: "REMOVE_FROM_CART",
    payload: axios
      .delete(`/api/cart/remove/${i}/${item}`)
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function checkout(cart, userid) {
  return {
    type: "CHECKOUT",
    payload: axios
      .post("/api/cart/checkout", { cart: cart, userid: userid })
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

export function getPurchases(id) {
  return {
    type: "GET_PURCHASES",
    payload: axios
      .post(`/api/pastPurchases/${id}`)
      .then(response => {
        return console.log(response.data);
      })
      .catch(console.log)
  };
}

// INITIAL STATE

const initialState = {
  user: {},
  sneakers: [],
  selectedSneaker: {},
  stock: [],
  isLoading: false,
  diderr: false,
  filterSilo: [],
  loggedIn: false,
  cart: [],
  pastPurchases: []
};

//REDUCER

function reducer(state = initialState, action) {
  switch (action.type) {
    // GET SNEAKERS

    case `${GET_SNEAKERS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_SNEAKERS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        sneakers: [...state.sneakers, action.payload]
      });

    //GET SNEAKER

    case `${GET_SNEAKER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_SNEAKER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_SNEAKER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        selectedSneaker: action.payload[0]
      });

    // GET STOCK
    case `${GET_STOCK}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_STOCK}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_STOCK}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        stock: action.payload
      });

    // GET USER

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload,
        loggedIn: true
      });

    // LOG OUT

    case `${LOGOUT}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${LOGOUT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${LOGOUT}_FULFILLED`:
      return Object.assign({}, state, { user: {}, loggedIn: false });

    // ADD TO CART

    case `${ADD_TO_CART}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${ADD_TO_CART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${ADD_TO_CART}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    case `${REMOVE_FROM_CART}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${REMOVE_FROM_CART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${REMOVE_FROM_CART}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    case `${CHECKOUT}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${CHECKOUT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CHECKOUT}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    case `${GET_PURCHASES}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_PURCHASES}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_PURCHASES}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        pastPurchases: [...state.pastPurchases, action.payload]
      });

    default:
      return state;
  }
}

export default reducer;
