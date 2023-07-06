const queryString = require("query-string");


const create = (params, credentials, product) => {
  return fetch("http://localhost:3000/api/products/API/by/" + params.shopId, {
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

const uploadF = (params, credentials, fileProduct) => {

  return fetch('http://localhost:3000/api/products/API/upload/'+ params.shopId, {
    method: 'POST',
    headers: {
      Accept: "application/json" ,
      Authorization: "Bearer " + credentials.t
    },
    body: fileProduct
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
  
};

const photo = params => {
  return fetch("http://localhost:3000/api/products/API/photo/" + params.productId, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

const listByShopAPI = params => {
  return fetch("http://localhost:3000/api/products/API/by/" + params.shopId, {
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
  return fetch("http://localhost:3000/api/products/API/" + params.shopId + "/" + params.productId, {
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
  return fetch("http://localhost:3000/api/products/API/" + params.shopId + "/" + params.productId, {
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
const readAPI = params => {
  return fetch("http://localhost:3000/api/products/API/" + params.productId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listAPI = params => {
  const query = queryString.stringify(params);
  return fetch("http://localhost:3000/api/products/API?" + query, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listLatestAPI = () => {
  return fetch(`http://localhost:3000/api/products/API/latest/${new Date().getTime()}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listRelatedAPI = params => {
  return fetch("http://localhost:3000/api/products/API/related/" + params.productId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const listCategoriesAPI = () => {
  return fetch(`http://localhost:3000/api/products/API/categories/${new Date().getTime()}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const subscription = params => {
  return fetch("http://localhost:3000/api/products/API/subscribe" + params.productId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

module.exports = {
  create,
  readAPI,
  update,
  remove,
  listByShopAPI,
  listLatestAPI,
  listRelatedAPI,
  listCategoriesAPI,
  listAPI,
  subscription,
  uploadF,
  photo
};
