import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import myApi from '../service/service';
import ListProduct from '../components/ListProduct';

const ProductsOfSeller = () => {
    const [products, setProducts] = useState(null);
    const {userId}= useParams();
    const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    bike: false,
    equipment: false,
    other: false,
  });

    const getProducts = async () => {
        myApi.get(`/products/user/${userId}`)
        .then((res)=> setProducts(res.data))
          .catch((error) => console.log(error))
      }

      useEffect(()=> {
        // getProducts();
        let queryString = "";
    for (const key in filters) {
      if (filters[key]) {
        queryString += `&category=${key}`;
      }
    }
    myApi.get(`/products/user/${userId}/?${queryString}`)
        .then((res)=> setProducts(res.data))
          .catch((error) => console.log(error))

      }, [userId,query, filters])

      let productToDisplay = products;
      console.log(productToDisplay)

  if (query != "") {
    productToDisplay = products.filter((element) => {
      // console.log(element);
      return element.name.includes(query);
    });
  }
  const handleCheckBox = (event) => {
    setFilters((current) => {
      return { ...current, [event.target.name]: event.target.checked };
    });
  };

      if(!products){
        return <p>Loading</p>
      }
  return (
    <div>
    <h1>{productToDisplay[0].seller.username}</h1>
    <div>
      <ListProduct products={productToDisplay} getProducts={getProducts} deleteBtn={false} getMessages={null}/>
    </div>
    <div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products 🔎 "
        />
        <fieldset>
          <legend>Filter by category</legend>
          <div>
            <label htmlFor="bike">Bike: </label>
            <input
              checked={filters.bike}
              onChange={handleCheckBox}
              type="checkbox"
              name="bike"
              id="bike"
            />
          </div>
          <div>
            <label htmlFor="equipment">Equipment: </label>
            <input
              checked={filters.equipment}
              onChange={handleCheckBox}
              type="checkbox"
              name="equipment"
              id="equipment"
            />
          </div>
          <div>
            <label htmlFor="other">Other: </label>
            <input
              checked={filters.other}
              type="checkbox"
              onChange={handleCheckBox}
              name="other"
              id="other"
            />
          </div>
        </fieldset>
      </div>
  </div>
  )
}

export default ProductsOfSeller