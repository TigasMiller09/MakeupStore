import {useState} from 'react'

import './ProductsScreen.css';

const TagComponent = ({name, value, initialChecked, handleCheck}) => {
  const [checked, setChecked] = useState(initialChecked)

  return (
    <label className="checkbox-container">{name}
        <input type="checkbox" 
            checked={checked}
            value={value} 
            onChange={(e) => {setChecked(e.target.checked); handleCheck(value, e.target.checked, null)}}
        />
        <span className="checkmark"></span>
    </label>
  );
}

export default TagComponent;