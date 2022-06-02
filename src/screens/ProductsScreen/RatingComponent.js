import {useState} from 'react'

import './ProductsScreen.css';

const RatingComponent = ({name, value, initialChecked, handleCheck}) => {
  const [checked, setChecked] = useState(initialChecked)

  return (
    <label className="checkbox-container">{name}
        <input type="checkbox" 
            checked={checked}
            value={value} 
            onChange={(e) => {setChecked(e.target.checked); handleCheck(null, null, value)}}
        />
        <span className="checkmark checkmark-rating"></span>
    </label>
  );
}

export default RatingComponent;