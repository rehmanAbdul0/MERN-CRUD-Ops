import React, {useEffect, useState} from 'react'
import ItemCard from '../Components/ItemCard';
import Navbar from '../Components/Navbar';

const AllItems = ()=>{
    const [items, setItems] = useState([]);
    useEffect(()=>{
        const fetchItems = async () =>{
            try{
                const response = await fetch('https://dummyjson.com/products',{

                });
                if(response.ok){
                    const data = await response.json();
                    setItems(data.products);
                    // setTotalPages(data.totalPages);
                    // console.log("data",data);
                }
            }
            catch(error){
                console.log("Error Fetching Projects ",error);
            }
        };
        fetchItems();
    },[])
    return (
        <>
        <Navbar />
        {/* Div with the labels for the displayed information */}
        <div className="w-full text-sm text-gray-700 font-semibold mb-2">
            <div className="grid grid-cols-2 gap-4">
                <div>ID</div>
                <div>Description</div>
                <div>Availability</div>
                <div>Category</div>
                <div>Price</div>
                <div>Rating</div>
                <div>Stock</div>
            </div>
        </div>
        <div>
          <h1 className='AllItems'>All Items</h1>
          {items.length === 0 ? (
            <p>No Items found.</p>
          ) : (
            <div>
              {items.map((item) => (
                <ItemCard key={item._id} obj={item}/>
              ))}
            </div>
          )}
        </div>
        {/* <CreateProject onNewProjectAdded={handleNewProjectAdded}/>
        <div className="buttonsDiv" style={{display:'flex',justifyContent:'center'}}>
          <button
          onClick={handlePrevPage}
          disabled={page === 1}
          style={page === 1 ? hoverButtonStyle : buttonStyle}
          >
          Previous Page
          </button>
          <span style={{marginTop:'15px'}}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            style={page === totalPages ? hoverButtonStyle : buttonStyle}
          >
            Next Page
          </button>
        </div> */}
        </>
    );
}

export default AllItems;