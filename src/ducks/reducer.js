import axios from "axios";

// CONSTANTS

const GET_SNEAKERS = "GET_SNEAKERS";
const GET_SNEAKER = "GET_SNEAKER";
const GET_STOCK = "GET_STOCK";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CHECKOUT = "CHECKOUT";
const GET_PURCHASES = "GET_PURCHASES";
const CHECK_FOR_USER = "CHECK_FOR_USER";

//ACTION CREATORS

// Gets all sneakers
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

// Gets one sneaker
export function getSneaker(id) {
  return {
    type: "GET_SNEAKER",
    payload: axios.get(`/api/sneaker/${id}`).then(response => {
      return response.data;
    })
  };
}

// Gets selected sneakers stock
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

// Gets user information once signed in
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

//Updates users shipping information
export function editUser(
  firstname,
  lastname,
  address,
  city,
  state,
  zipcode,
  email,
  phone
) {
  return {
    type: "EDIT_USER",
    payload: axios
      .put(`/api/editUser/${this.props.match.params.id}`, {
        firstname: firstname,
        lastname: lastname,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        email: email,
        phone: phone
      })
      .then(response => {
        return response.data;
      })
      .catch(console.log("Couldn't update user info"))
  };
}

// Logs out user
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

// GETS CURRENT CART

export function getCart() {
  return {
    type: "GET_CART",
    payload: axios
      .get("/api/getCart")
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

// Adds sneaker to cart
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

// Removes sneaker from cart
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

// Checkout items in users cart
export function checkout(cart, userid, authid) {
  return {
    type: "CHECKOUT",
    payload: axios
      .post("/api/cart/checkout", {
        cart: cart,
        userid: userid,
        authid: authid
      })
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

// Finds all of the users past purchases
export function getPurchases(id) {
  return {
    type: "GET_PURCHASES",
    payload: axios
      .get(`/api/past/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(console.log)
  };
}

// Checks for user on session

export function checkForUser() {
  return {
    type: "CHECK_FOR_USER",
    payload: axios
      .get(`/api/checkForUser`)
      .then(response => {
        return response.data;
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
      return Object.assign({}, state, {
        user: {},
        loggedIn: false,
        cart: []
      });

    // ADD TO CART

    case `${ADD_TO_CART}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${ADD_TO_CART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${ADD_TO_CART}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    // Remove from cart
    case `${REMOVE_FROM_CART}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${REMOVE_FROM_CART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${REMOVE_FROM_CART}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    // Checkout
    case `${CHECKOUT}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${CHECKOUT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CHECKOUT}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    // Get purchases
    case `${GET_PURCHASES}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_PURCHASES}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_PURCHASES}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        pastPurchases: action.payload
      });

    case `${CHECK_FOR_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${CHECK_FOR_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${CHECK_FOR_USER}_FULFILLED`:
      if (action.payload.hasOwnProperty("message")) {
        return Object.assign({}, state, {
          isLoading: false,
          user: {},
          loggedIn: true
        });
      } else {
        return Object.assign({}, state, {
          isLoading: false,
          user: action.payload,
          loggedIn: true
        });
      }

    case `${GET_CART}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case `${GET_CART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_CART}_FULFILLED`:
      return Object.assign({}, state, { cart: action.payload });

    default:
      return state;
  }
}

export default reducer;
