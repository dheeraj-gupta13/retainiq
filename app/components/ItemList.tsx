"use client"
import React, { useEffect, useState } from 'react'
import Item from './Item'
import {productData} from "../../db/data"
import { FaPlus } from "react-icons/fa";

type Product = {
  id: number;
  sno: number;
  varient: number[];
  filters:number
};

function ItemList() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productData);
  },[])

  const handleAddItem = () => {
    

    let size = products.length + 1;
    let rowSize = products[0].varient.length;
    const zerosArray = new Array(rowSize).fill(0);
    const newItem =  {
      id : size,
      sno: size,
      varient: zerosArray,
      filters:0,
    }

    setProducts([...products, newItem]);
  }


  const handleAddRow = () => {
    

    const updatedProducts = products.map(item => ({
      ...item,
      varient: [...item.varient, 0]
    }));
    setProducts(updatedProducts);

  }

  return (
    <>
     <div className='bg-gray-100 m-10 rounded-md outline outline-1  outline-gray-300'>
     {
        products.map((product) => (
            <Item product={product}  key={product.id} handleAddRow={handleAddRow} id={product.id} products={products} setProducts={setProducts} />
        ))
     }

      <button onClick={handleAddItem}  className='items-center outline outline-1 outline-gray-300 p-4  shadow-lg rounded-md m-10 bg-white '>
        <FaPlus />    
      </button>
     </div>

    </>
  )
}

export default ItemList