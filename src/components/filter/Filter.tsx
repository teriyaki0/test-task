import { FC, useState } from "react";
import styles from './Filter.module.scss'
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
      <div className={styles.search}>
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Введите текст"
          className={styles.search__input}
        />
        <button onClick={handleFilterClick} className={styles.search__button}>🔎</button>
      </div>
    );
  };


export default Filter;
