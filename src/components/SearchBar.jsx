import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialSearchKey }) => {
    const [searchKey, setSearchKey] = useState(initialSearchKey || '');

    useEffect(() => {
        setSearchKey(initialSearchKey || '');
        onSearch(initialSearchKey || '');
    }, [initialSearchKey, onSearch]);

    const handleSearchChange = (e) => {
        const newSearchKey = e.target.value;
        setSearchKey(newSearchKey);
        onSearch(newSearchKey);
    };

    return (
        <div className="mb-4 flex items-center">
            <div className="max-w-md mx-auto border rounded-lg">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-natural">
                        <FaSearch className="h-4 w-4" />
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 rounded-r-md"
                        type="text"
                        id="search"
                        placeholder="Search notes..."
                        value={searchKey}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    initialSearchKey: PropTypes.string,
};

export default SearchBar;
