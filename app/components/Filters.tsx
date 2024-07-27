import React, {useEffect, useState} from 'react'
import { filterItem } from '@/db/data';
import { GrGallery } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";


function Filters({ isOpen, onClose, id, filters ,setProducts, products} : any) {

    console.log("inside products", products)

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
  
    //   const filteredItems = filterItem.filter(product => 
    //     product.title.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
  
      const handleUpdateProduct = (currentFilterId : any) => {

        console.log("__________>", currentFilterId)
        console.log("__________>", products)
        // const updatedProducts = products.map((product : any) => {
        //     if (product.id === id) {
        //       return {
        //         ...product,
        //         filters: currentFilterId
        //       };
        //     }
        //     return product;
        //   });
      
        //   setProducts(updatedProducts);
      
        //   console.log('Products after update:', updatedProducts);
    
        //   onClose();
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
                  filterItem.map((product) => (
                    <div onClick={() => handleUpdateProduct(product.id)}  key={product.id} className='w-32 group relative'>
                        <p className='truncate'>{product.title}</p>
                    </div>
                  ) )
                }
              </div>
            </div>
          </div>
        );
  
}

export default Filters