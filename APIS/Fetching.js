import { client } from "../SanityData/client";
import axios from "axios";

async function fetchingHomePanner() {
  const query =
    '*[_type == "product"]{ "category": category->name, image, rating, name, slug, price, brand, colour, form_factor, connectivity_technology, age_range, control_type }';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type  == "banner"]{... , "category": category->name}';
  const bannerData = await client.fetch(bannerQuery);
  return [products, bannerData];
}
async function getMyProduct(slug) {
  const query = '*[_type == "product" && slug.current == $slug]';
  try {
    const product = await client.fetch(query, { slug });
    return [product];
  } catch (err) {
    throw {
      message: "Failed to fetch prodcuts",
      statusText: product.statusText,
      status: product.status,
    };
  }
}
async function getUser(userid) {
  const query = `*[_type == "user" && _id == '${userid}']`;
  try {
    const user = await client.fetch(query);
    console.log(user);
    return [user];
  } catch (err) {
    console.log(err);
  }
}

async function getCategories() {
  const query = '*[_type == "category"]';
  try {
    const categories = await client.fetch(query);
    console.log(categories);
    return [categories];
  } catch (err) {
    throw {
      message: "Failed to fetch categories",
      error: err,
    };
  }
}

let proxy = "https://corsproxy.io/?";
async function sendObjectIDToDatabase(id, comment, rating) {
  try {
    const response = await axios.post(
      proxy + `https://shopify-apis-production.up.railway.app/reviews`,
      { productId: id, comment: comment, rating: rating }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getReviews(id) {
  try {
    const response = await axios.get(
      proxy +
        `https://shopify-apis-production.up.railway.app/reviews?product_id=${id}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
export {
  fetchingHomePanner,
  sendObjectIDToDatabase,
  getReviews,
  getMyProduct,
  getCategories,
  getUser,
};
