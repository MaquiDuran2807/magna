import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

type SearchProps = {
    setFilter: (filter: string) => void;
};

const Search: React.FC<SearchProps> = ({ setFilter }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        setFilter(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Buscar..."
                className='blog-search'
            />
            <FiSearch className="ms-2" />
        </div>
    );
};

export default Search;