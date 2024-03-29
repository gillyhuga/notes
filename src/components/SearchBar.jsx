import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import useInput from '../lib/hooks/useInput';
import { useLanguage } from '../lib/context/LanguageContext';

const SearchBar = ({ onSearch }) => {
    const [searchKey, handleSearchChange] = useInput('');
    const { translate } = useLanguage();

    useEffect(() => {
        onSearch(searchKey);
    }, [searchKey, onSearch]);

    return (
        <div className="mb-4 flex items-center">
            <div className="max-w-md mx-auto border rounded-lg">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-natural">
                        <FaSearch className="h-4 w-4" />
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm bg-transparent pr-2 rounded-r-md"
                        type="text"
                        id="search"
                        placeholder= {translate('searchBar')}
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
};

export default SearchBar;
