import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired, // searchQuery must be a string and is required
  setSearchQuery: PropTypes.func.isRequired, // setSearchQuery must be a function and is required
};

export default SearchBar;
