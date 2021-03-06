import useUserSearch from "../../hooks/use-user-search"

const Search = () => {
  const { user, changeUser, searchUser } = useUserSearch()

  return (
    <div className="flex flex-row py-6 mb-6">
      <input
        className="flex-grow mr-6 py-2 px-4 rounded-md bg-gray-900"
        aria-label="search github user"
        type="text"
        placeholder="Search for a GitHub user..."
        value={user}
        onChange={(e) => changeUser(e)}
        onKeyDown={(e) => searchUser(e)}
      />
      <button
        className="bg-blue-600 px-4 font-semibold rounded-md"
        onClick={(e) => searchUser(e)}
        disabled={!user}
      >
        Search
      </button>
    </div>
  )
}

export default Search
