import React, { useEffect, useState } from "react";
import { getList, searchCharacter } from "../../../services/apiServices";
import "./Content.css";
export default function Content() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [result, setResult] = useState([]);



  useEffect(() => {
    async function fetchData() {
      const result = await getList(page);
      setData(result.results);
      console.log(result.results)
    }

    fetchData();
  }, [page]);

  async function HandleNextPage() {
    if (page < 42) {
      setPage(page + 1);
    }
    console.log(page)
  }
  async function HandlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
    console.log(page)
  }

  async function handleInput(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
    const result = await searchCharacter(search);
    console.log(result)
    console.log(result.results);
    setResult(result.results)

  };


  return (
    <>
      <div>
        <div className="search-bar" >
          <input type="text" onChange={handleInput} value={search} />
        </div>
        <div className="list">List of Characters</div>
        <div className="details">
          <div className="details-card">
            {(search ? (result || []) : data).map((character, id) => (
              <div key={id} className="details-content">
                <div className="details-container">
                  <img className="details-image" alt={character.name} src={character.image} />
                  <div>
                    Name : {character.name.substring(0, 22)}{" "}
                  </div>
                  <div>
                    Status : {character.status}{" "}
                  </div>
                  <div> origin : {character.origin.name} </div>
                  <div> species : {character.species} </div>
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
              {page}/42
            </div>

            <div className="silder-next" onClick={HandleNextPage}>
              Next
            </div>
          </div>
        </div>
      </div>

    </>

  );
}
