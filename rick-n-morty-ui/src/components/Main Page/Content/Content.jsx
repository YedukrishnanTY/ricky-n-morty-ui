import React, { useEffect, useState } from "react";
import { getList } from "../../../services/apiServices";
import "./Content.css";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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
      try {
        const result = await getList(
          filter.page,
          filter.name,
          filter.status,
          filter.gender,
          filter.species
        );
        setData(result.results);
        setLastPage(result.info.pages);
      } catch (e) {
        console.log(e);
        setLastPage(1);
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
    if (e.target.value === "all") {
      e.target.value = "";
    }
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
      <div>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "9px",
          }}
          display="flex"
          justifyContent="center"
          flexDirection="row"
          padding="1vh 4vh"
          margin="1vh 6vh"
        >
          <Grid
            container
            gap={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                onChange={handleValues}
                name="name"
              />
            </Grid>
            <Grid>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Status"
                  name="status"
                  id="status"
                  onChange={handleValues}
                  defaultValue="all"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="alive">alive</MenuItem>
                  <MenuItem value="dead">dead</MenuItem>
                  <MenuItem value="unknown">unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="gender"
                  name="gender"
                  id="gender"
                  onChange={handleValues}
                  defaultValue="all"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="female">female</MenuItem>
                  <MenuItem value="male">male</MenuItem>
                  <MenuItem value="genderless">genderless</MenuItem>
                  <MenuItem value="unknown">unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="species"
                  name="species"
                  id="species"
                  onChange={handleValues}
                  defaultValue="all"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="human">human</MenuItem>
                  <MenuItem value="alien">alien</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                type="submit"
                value="Search"
                onClick={handleInput}
              />
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <Grid container padding="10vh" gap={6} display="flex" justifyContent="center">
          {data.map((character, id) => (
            <Grid lg={2}  margin="4px" >
              <Card
                key={id}
                display="flex"
                style={{ flexWrap: "wrap", gap: "3em" }}

                
              >
                <img
                  component="img"
                  alt={character.name}
                  src={character.image}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Name: {character.name}
                  </Typography>
                  {button[id] && (
                    <div>
                      <Typography variant="h6" color="textSecondary">
                        Gender: {character.gender}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Status: {character.status}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Species: {character.species}
                      </Typography>
                    </div>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleButton(id)}
                    style={{ backgroundColor: button[id] ? "red" : "green" }}
                  >
                    {button[id] ? "View Less Details" : "View More Details"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
