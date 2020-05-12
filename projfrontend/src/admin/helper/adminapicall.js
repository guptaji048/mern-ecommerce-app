import { Api } from "../../backend";

//category Calls
export const createCategory = (userId, token, category) => {
  return fetch(`${Api}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllCategory = () => {
  return fetch(`${Api}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategory = categoryId => {
  return fetch(`${Api}/category/${categoryId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateCategory = (userId, token, category, categoryId) => {
  return fetch(`${Api}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (userId, categoryId, token) => {
  return fetch(`${Api}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//product calls
export const createProduct = (userId, token, product) => {
  return fetch(`${Api}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllProduct = () => {
  return fetch(`${Api}/products`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = productId => {
  return fetch(`${Api}/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (userId, token, product, productId) => {
  return fetch(`${Api}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (userId, productId, token) => {
  return fetch(`${Api}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//order calls
export const getAllOrder = (userId, token) => {
  return fetch(`${Api}/orders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
