import React, {useEffect, useState} from 'react'
import { productItem } from '@/db/data';
import { GrGallery } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";


function Modal({ isOpen, onClose, id, varientId ,setProducts, products} : any) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

    if (!isOpen) return null;

    const filteredItems = productItem.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateProduct = (currentProductId : any) => {
      const updatedProducts = products.map((product : any) => {
        if (product.id === id) {
          return {
            ...product,
            varient: product.varient.map((v : number) => v === varientId ? currentProductId : v)
          };
        }
        return product;
      });
  
      setProducts(updatedProducts);
      onClose();
    }
    
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-5 rounded-md'>
        
            <div className='flex items-center justify-between'>
                <GrGallery/>
                <button className='  px-2 py-1 rounded' onClick={onClose}>
                <RxCross2 />
              </button>
            </div>
            <div className='flex items-center justify-between'>
              <p>Select a design to link</p>
              <input
                type='text'
                placeholder='Search...'
                className=' p-2 mb-4 border border-gray-300 rounded'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-4 gap-4 h-[400px] overflow-y-auto no-scrollbar'>

              {
                filteredItems.map((product) => (
                  <div  key={product.id} className='w-32 group relative'>
                      <img className='rounded-md w-full' src={product.imageUrl} />
                      <p className='truncate'>{product.title}</p>

                      <div onClick={() => handleUpdateProduct(product.id)}  className='absolute inset-0 flex items-center justify-center hidden group-hover:flex  bg-opacity-50 rounded-md '>
                        <button className='bg-white  p-3 rounded'>
                            Insert
                        </button>
                      </div>
                  </div>
                ) )
              }
            </div>
          </div>
        </div>
      );
}

export default Modal