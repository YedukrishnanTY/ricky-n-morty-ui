import React, { useEffect, useState } from "react";
import { getList, searchCharacter } from "../../../services/apiServices";
import "./Content.css";
export default function Content() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [button, setButton] = useState(Array(data.length).fill(true));

  useEffect(() => {
    async function fetchData() {
      const result = await getList(page);
      setData(result.results);
      console.log(result.results);
    }

    fetchData();
  }, [page]);

  async function HandleNextPage() {
    if (page < 42) {
      setPage(page + 1);
    }
    console.log(page);
  }
  async function HandlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
    console.log(page);
  }

  async function handleInput(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
    const result = await searchCharacter(search);
    console.log(result);
    console.log(result.results);
    setResult(result.results);
  }
  const handleButton = (id) => {
    setButton(prev => {
      const newButtonStates =[...prev];
      newButtonStates[id] =!newButtonStates[id];
      return newButtonStates
    })
    console.log(button)
  }

  return (
    <>
      <div className="content-page">
        <div>
          <div className="search-bar">
            <input
              type="text"
              onChange={handleInput}
              value={search}
              placeholder="Search...."
            />
          </div>
          <div className="list">List of Characters</div>
          <div className="details">
            <div className="details-card">
              {(search ? result || [] : data).map((character, id) => (
                <div key={id} className="details-content">
                  <div className="details-container">
                    <img
                      className="details-image"
                      alt={character.name}
                      src={character.image}
                    />
                    <div>Name : {character.name} </div>
                    {button[id]  &&
                      <div className="conditional-div">
                        <div>
                          <div> Gender : {character.gender} </div>
                        </div>
                        <div>Status : {character.status} </div>
                        <div> species : {character.species} </div>{" "}
                      </div>
                    }
                    {button[id]? <input type="button" onClick={()=> handleButton(id)} style={{backgroundColor : "red"}} value="View Less Details"/> :
                    <input type="button"  onClick={()=> handleButton(id)} value="View More Details"/> }
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        {!search ? (
          <div className="silder">
            <div className="silder-card">
              <div className="silder-content">
                <div className="silder-previous" onClick={HandlePreviousPage}>
                  Previous
                </div>

                <div className="silder-count">{page}/42</div>

                <div className="silder-next" onClick={HandleNextPage}>
                  Next
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
