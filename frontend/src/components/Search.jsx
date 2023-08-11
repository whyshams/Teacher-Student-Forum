import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Search = ({ Posts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = Posts.filter((post) =>
      post.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="searchDiv">
      <Card className="p-3">
        <h1>Search Post</h1>
        <input
          type="text"
          placeholder="Search by description"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery !== "" && (
          <div className="searchRes">
            <Card className="p-3">
              {filteredPosts.map((post) => (
                <div className="p-4" key={post.id}>
                  <h3>{post.name}</h3>
                  <p>{post.description}</p>
                </div>
              ))}
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Search;
