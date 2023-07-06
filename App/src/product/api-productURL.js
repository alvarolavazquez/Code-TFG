const queryString = require("query-string");


const create = (params, credentials, product) => {
  return fetch("http://localhost:3000/api/products/URL/by/" + params.shopId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const photo = params => {
  return fetch("http://localhost:3000/api/products/URL/photo/" + params.productId, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const listByShopURL = params => {
  return fetch("http://localhost:3000/api/products/URL/by/" + params.shopId, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const update = (params, credentials, product) => {

  return fetch("http://localhost:3000/api/products/URL/" + params.shopId + "/" + params.productId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const remove = (params, credentials) => {
  return fetch("http://localhost:3000/api/products/URL/" + params.shopId + "/" + params.productId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
const readURL = params => {
  return fetch("http://localhost:3000/api/products/URL/" + params.productId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listURL = params => {
  const query = queryString.stringify(params);
  return fetch("http://localhost:3000/api/products/URL?" + query, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listLatestURL = () => {
  return fetch(`http://localhost:3000/api/products/URL/latest/${new Date().getTime()}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listRelatedURL = params => {
  return fetch("http://localhost:3000/api/products/URL/related/" + params.productId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listCategoriesURL = () => {
  return fetch(`http://localhost:3000/api/products/URL/categories/${new Date().getTime()}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

module.exports = {
  create,
  readURL,
  update,
  remove,
  listByShopURL,
  listLatestURL,
  listRelatedURL,
  listCategoriesURL,
  listURL,
  photo
};
