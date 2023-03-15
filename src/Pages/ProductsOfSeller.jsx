import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import myApi from '../service/service';
import ListProduct from '../components/ListProduct';

const ProductsOfSeller = () => {
    const [products, setProducts] = useState(null);
    const [seller, setSeller] = useState(null);
    const {userId}= useParams();
    const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    bike: false,
    equipment: false,
    other: false,
  });

  useEffect(()=> {
    let queryString = "";
    for (const key in filters) {
      if (filters[key]) {
        queryString += `&category=${key}`;
      }
    }
    // get products
    myApi.get(`/products/user/${userId}/?${queryString}`)
      .then((res)=> setProducts(res.data))
      .catch((error) => console.log(error))

    //  get messages 
    myApi.get(`/auth/user/${userId}`).then(res => setSeller(res.data)).catch((error) => console.log(error))
      
  }, [userId,query, filters])

      let productToDisplay = products;

  if (query != "") {
    productToDisplay = products.filter((element) => {
      return element.name.includes(query);
    });
  }

  const handleCheckBox = (event) => {
    setFilters((current) => {
      return { ...current, [event.target.name]: event.target.checked };
    });
  };

  if(!products || !seller){
    return <p>Loading</p>
  }

  return (
    <div>

    <h1>{seller.username}</h1>

    <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products 🔎 "
        />
        <fieldset>
          <legend>Filter by category</legend>
            <label htmlFor="bike">Bike: </label>
            <input
              checked={filters.bike}
              onChange={handleCheckBox}
              type="checkbox"
              name="bike"
              id="bike"
            />
            <label htmlFor="equipment">Equipment: </label>
            <input
              checked={filters.equipment}
              onChange={handleCheckBox}
              type="checkbox"
              name="equipment"
              id="equipment"
            />
            <label htmlFor="other">Other: </label>
            <input
              checked={filters.other}
              type="checkbox"
              onChange={handleCheckBox}
              name="other"
              id="other"
            />
        </fieldset>
      </div>

    <div>
      <ListProduct products={productToDisplay} getProducts={null} deleteBtn={false} getMessages={null}/>
    </div>
  </div>
  )
}

export default ProductsOfSeller