import React, { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';

type SearchProps = {
    setFilter: (filter: string) => void;
    isSearching?: boolean;
};

const Search: React.FC<SearchProps> = ({ setFilter, isSearching }) => {
    const [searchValue, setSearchValue] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setFilter(value);
        }, 350);
    };

    const handleClear = () => {
        setSearchValue('');
        setFilter('');
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: '40%', maxWidth: '500px' }}>
            <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Buscar artículos..."
                className="blog-search"
                style={{ width: '100%', paddingRight: searchValue ? '2.5rem' : '1.5rem' }}
            />
            {isSearching && (
                <span style={{
                    position: 'absolute',
                    right: searchValue ? '2.8rem' : '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                    }} />
                </span>
            )}
            {searchValue && !isSearching && (
                <button
                    type="button"
                    onClick={handleClear}
                    style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                    }}
                    aria-label="Limpiar búsqueda"
                >
                    <BsX />
                </button>
            )}
            <style>{`
                @keyframes spin {
                    to { transform: translateY(-50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Search;
