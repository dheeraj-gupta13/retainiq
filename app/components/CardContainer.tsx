"use client"
import React, {useState} from 'react'
import { productItem } from '@/db/data'
import { FaPlus } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Modal from "./Modal"
import Filters from './Filters';

function CardContainer({type,varientId, id, setProducts, products, filters} : any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFiltersClick = () => {
    setIsFiltersOpen(true);
  };

  const closeFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <>
    { 
        (type == "filter")  ?

      
        <div>
          {
            (filters == 0) ?
            <div className='outline-dashed outline-2  outline-gray-300 rounded-md p-[70px] m-4  bg-white'>
            <button  onClick={handleFiltersClick} className='flex gap-2 items-center outline outline-1 outline-gray-300 p-2 w-[200px]  shadow-lg rounded-md'>
                <FaPlus />
                <span>Add Product Filters</span>
            </button>
        </div>

            :

            <div className='outline-dashed outline-2  outline-gray-300 rounded-md p-[70px] m-4  bg-white'>
            <button className='flex gap-2 items-center outline outline-1 outline-gray-300 p-2 w-[200px]  shadow-lg rounded-md'>
                <FaPlus />
                <span>Add Product Filters</span>
            </button>
        </div>

          }
        </div>

       
        :
        <div>
        {
          (varientId == 0)
          ? 
          <div className='flex items-center outline-dashed outline-2  outline-gray-300 rounded-md p-5 m-4 w-[170px] h-[180px] bg-white'>
            <button onClick={handleEditClick} className='flex gap-2 items-center outline outline-1 outline-gray-300 p-2 w-[130px] shadow-lg rounded-md'>
              <FaPlus />
              <span>Add design</span>
            </button>
          </div>
          :
          <div className=' outline-dashed outline-2  outline-gray-300 rounded-md p-5 m-4 w-[170px] bg-white group relative'>
              <img className='rounded-md' src={productItem[varientId-1].imageUrl} />
                <p className='truncate'>{productItem[varientId-1].title}</p>
                <div className='absolute inset-0 flex items-center justify-center hidden group-hover:flex  bg-opacity-50 rounded-md'>
                  <button onClick={handleEditClick} className='bg-white  p-3 rounded'>
                      <FaRegEdit className='text-black '/>
                  </button>
                </div>
          </div>
        }
        </div>
    }
    
      <Modal isOpen={isModalOpen} onClose={closeModal} id={id} varientId={varientId } setProducts={setProducts} products={products}/>
      {/* <Filters isOpen={isFiltersOpen} onClose={closeFilters} id={id} filters={filters} setProducts={setProducts} products={products}/> */}
    </>
   
  )
}

export default CardContainer