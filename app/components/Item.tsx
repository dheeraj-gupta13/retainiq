"use client"

// import { productData } from '@/db/data'
import React, {useState} from 'react'
import CardContainer from './CardContainer'
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";


interface Product {
  id: number;
  sno: number;
  varient: number[];
  filters:number;
}

function Item({product, handleAddRow, id, setProducts, products}: any) {

  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product : any) => product.id !== id).map((product : Product, index : number) => ({
      ...product,
      id: index + 1,
      sno: index + 1
    }));

    setProducts(updatedProducts);
  };

 
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    setDraggedIndex(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === id) return;

    setProducts((prevProducts : any) => {
      const updatedProducts = [...prevProducts];
      const [movedProduct] = updatedProducts.splice(draggedIndex, 1);
      updatedProducts.splice(id, 0, movedProduct);

      return updatedProducts.map((product, idx) => ({
        ...product,
        id: idx + 1,
        sno: idx + 1
      }));
    });

    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };



  return (
    <li    
    draggable
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    onDragEnd={handleDragEnd}

        onMouseEnter={() => setHoveredProductId(product.id)}
         onMouseLeave={() => setHoveredProductId(null)}  className='flex gap-4 items-center  px-10 align-center '>
      <div className='flex flex-col items-center'>
        <RiDeleteBinLine 
            className='text-2xl text-red-400'
              style={{ visibility: hoveredProductId === product.id ? 'visible' : 'hidden' }} 
              onClick={() => handleDeleteProduct(product.id)}
          />
        <p className='text-3xl'>{product.id}</p>
      </div>
      <CardContainer type="filter" filters={product.filters} />
      <div className='flex items-center overflow-y-auto no-scrollbar'>
        {
            product.varient.map((card : any, index : any) => (
                <CardContainer type="varient" varientId={card} key={index} id={id} products={products} setProducts={setProducts} />
            ))
        }
        <div className='flex-shrink-0'>
          <button onClick={handleAddRow} className=' items-center outline outline-1 outline-gray-300 p-4  shadow-lg rounded-md m-6 bg-white '>
            <FaPlus />    
          </button>
        </div>
      </div>
       
    </li>
  )
}

export default Item