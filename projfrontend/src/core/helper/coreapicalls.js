import { Api } from "../../backend";

export const getProducts = () => {
  return fetch(`${Api}/products`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
