import React, { useEffect, useState } from "react";
import { getList } from "../../../services/apiServices";
import "./Content.css";
export default function Content() {
  const [lastpage, setLastPage] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    name: "",
    status: "",
    gender: "",
    species: "",
  });
  const [searchFilter, setSearchFilter] = useState({
    page: 1,
    name: "",
    status: "",
    gender: "",
    species: "",
  });
  const [button, setButton] = useState(Array(filter.length).fill(false));



  useEffect(() => {
    async function fetchData() {
      try{
      const result = await getList(
        filter.page,
        filter.name,
        filter.status,
        filter.gender,
        filter.species
      );
      setData(result.results);
      setLastPage(result.info.pages );
      }
      catch(e){
        console.log(e)
        setLastPage(1)
      }
    }
    fetchData();
  }, [filter]);

  async function HandleNextPage() {
    if (filter.page < lastpage) {
      setFilter((previous) => ({
        ...previous,
        page: previous.page + 1,
      }));
    }
    console.log(filter.page);
  }

  async function HandlePreviousPage() {
    if (filter.page > 1) {
      setFilter((previous) => ({
        ...previous,
        page: previous.page - 1,
      }));
    }
    console.log(filter);
  }

  async function handleInput(e) {
    setFilter((previous) => ({
      ...previous,
      ...searchFilter,
    }));
    console.log(filter);
    console.log(searchFilter);
  }

  function handleValues(e) {
    setSearchFilter((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    console.log(searchFilter);
  }

  const handleButton = (id) => {
    setButton((prev) => {
      const newButtonStates = [...prev];
      newButtonStates[id] = !newButtonStates[id];
      return newButtonStates;
    });
    console.log(button);
  };

  return (
    <>
      <div className="search">
        <div className="search-card">
          <div className="search-details">
            <div className="search-content">
              <input
                type="text"
                placeholder="name..."
                onChange={handleValues}
                name="name"
              />

              <select name="status" id="status" onChange={handleValues}>
                <option value="">All</option>
                <option value="alive">alive</option>
                <option value="dead">dead</option>
                <option value="unknown">unknown</option>
              </select>

              <select name="gender" id="gender" onChange={handleValues}>
                <option value="">All</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="genderless">genderless</option>
                <option value="unknown">unknown</option>
              </select>

              <select name="species" id="species" onChange={handleValues}>
                <option value="">All</option>
                <option value="human">human</option>
                <option value="alien">alien</option>
              </select>

              <input type="submit" value="Search" onClick={handleInput}></input>
            </div>
          </div>
        </div>
      </div>
      <div className="content-page">
        <div>
          <div className="list">List of Characters</div>
          <div className="details">
            <div className="details-card">
              {(data || []).map((character, id) => (
                <div key={id} className="details-content">
                  <div className="details-container">
                    <img
                      className="details-image"
                      alt={character.name}
                      src={character.image}
                    />
                    <div>Name : {character.name} </div>
                    {button[id] && (
                      <div className="conditional-div">
                        <div>
                          <div> Gender : {character.gender} </div>
                        </div>
                        <div>Status : {character.status} </div>
                        <div> species : {character.species} </div>{" "}
                      </div>
                    )}
                    {button[id] ? (
                      <input
                        type="button"
                        onClick={() => handleButton(id)}
                        style={{ backgroundColor: "red" }}
                        value="View Less Details"
                      />
                    ) : (
                      <input
                        type="button"
                        onClick={() => handleButton(id)}
                        value="View More Details"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="silder">
          <div className="silder-card">
            <div className="silder-content">
              <div className="silder-previous" onClick={HandlePreviousPage}>
                Previous
              </div>

              <div className="silder-count">
                {filter.page} / {lastpage}
              </div>
              <div className="silder-next" onClick={HandleNextPage}>
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
