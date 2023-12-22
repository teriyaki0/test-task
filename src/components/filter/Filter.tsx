import { FC, useState } from "react";

type FilterComponentProps = {
    onFilter: (filterText: string) => void;
  };

const Filter: FC<FilterComponentProps> = ({ onFilter }) => {
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(event.target.value);
    };
  
    const handleFilterClick = () => {
      onFilter(filterText);
    };
  
    return (
      <div>
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Введите текст для фильтрации"
        />
        <button onClick={handleFilterClick}>Найти</button>
      </div>
    );
  };


export default Filter;
