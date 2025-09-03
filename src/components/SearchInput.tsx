const SearchInput = ({ username, setUsername }: SearchInputProps) => {
    return (
        <div className="search-input-container">
            <input
                type="text"
                placeholder="Enter a username to search"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-full pr-8 pl-12 outline-none text-white text-sm bg-grey-dark rounded-xl" />
            <img src="/icons/Search.svg" alt="Search bar" className="absolute top-1/2 -translate-y-1/2 left-12" />
        </div>
    )
}

export default SearchInput;