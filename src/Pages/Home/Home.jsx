import React, {useState, useEffect} from "react";
import ListProduct from "../../components/ListProduct";
import myApi from "../../service/service";

const Home = () => {
  const [products, setProducts] = useState(null);

  const getProducts= ()=> {
    myApi.get('/products')
    .then((res) => setProducts(res.data))
    .catch((error) => console.log(error))
  }
  useEffect(()=> {
    getProducts();
  }, [])

  return <div>
    <h1>Name of the website</h1>
    <div>button/field for the query</div>
    <div>
      <ListProduct products={products} getProducts={getProducts} deleteBtn={false}/>
    </div>
  </div>;
};

export default Home;
