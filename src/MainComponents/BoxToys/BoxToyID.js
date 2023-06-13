import './BoxToyID.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoxToyDataID } from '../BoxToys/reducerBoxToyID';
import { useState } from 'react';


export default function BoxToyID() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const boxToyDataID = useSelector((state) => state.boxToyID.data);
  const [imageIndex, setImageIndex ] = useState(0);
 


  useEffect(() => {
    dispatch(fetchBoxToyDataID(id));
  }, [id]);

  console.log(boxToyDataID);

  if (!boxToyDataID) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  return (
    <div key={boxToyDataID.id} className='boxToyID'>
      <div className='boxToyIDColumns'>
        <div className='boxToyIDColumn1'>
          <div className='boxToyIDColumnRight'>
            {boxToyDataID.productImages?.map((image,index) => (
              <img key={image.id}
              src={`http://localhost:5000/${image.imagePath}`}
              alt={`Image ${boxToyDataID.name}`}
              onClick={()=> setImageIndex(index)}/>
            ))}
          </div>
          <div className='boxToyIDColumnLeft'>
            <img src={`http://localhost:5000/${boxToyDataID?.productImages?.[imageIndex]?.imagePath}`} alt="Selected Image" />
          </div>
        </div>
        <div className='boxToyIDColumn2'>
          <h4>{boxToyDataID.name}</h4>
          <h3>Description</h3>
          <hr />
          <p>{boxToyDataID.description}</p>
          <p className="price">$ {boxToyDataID.price} USD</p>
        </div>
      </div>
    </div>
  );
}


// export default function BoxToyID() {


//   return (
//     <div key={boxToyDataID.id} className='boxToyID'>
//       <div className='boxToyIDColumns'>
//         <div className='boxToyIDColumn1'>
//           <div className='boxToyIDColumnRight'>
//             {boxToyDataID.productImages?.map((image, index) => (
//               <img key={image.id} 
//               src={`http://localhost:5000/${image.imagePath}`} 
//               alt={`Image ${boxToyDataID.name}`} 
//               onClick={setImageIndex(index)}/>
//             ))}
//           </div>
//           <div className='boxToyIDColumnLeft'>
//             {/* <img src={`http://localhost:5000/${boxToyDataID.productImages[0]?.imagePath}`} alt="Selected Image" /> */}
//           </div>
//         </div>
//         <div className='boxToyIDColumn2'>
//           <h4>{boxToyDataID.name}</h4>
//           <h3>Description</h3>
//           <hr />
//           <p>{boxToyDataID.description}</p>
//           <p className="price">$ {boxToyDataID.price} USD</p>
//         </div>
//       </div>
//     </div>
//   );
// }
