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
  Pagination,
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            borderRadius: "9px",
          }}
          display="flex"
          justifyContent="center"
          flexDirection="row"
          padding="1vh 12vh"
          margin="4vh 35vh"
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
                variant="contained"
                type="submit"
                value="Search"
                onClick={handleInput}
              >
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div>
        <Grid
          container
          padding="10vh"
          gap={6}
          display="flex"
          justifyContent="center"
        >
          {data.map((character, id) => (
            <Grid lg={2} margin="4px">
              <Card
                key={id}
                display="flex"
                style={{
                  background:
                    "linear-gradient(180.3deg,rgb(221, 221, 221) 5.5%,rgb(103, 164, 221) 90.2%)",
                  boxShadow: "0 8px 12px 8px rgba(92, 192, 238, 0.315)",
                }}
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

        <Pagination
          size="large"
          sx={{ display: "flex", justifyContent: "center" , backgroundcolor :"blue"}}
          count={lastpage}
          onChange={(event, page) =>
            setFilter((previous) => ({
              ...previous,
              page: page,
            }))
          }
        />

      </div>
    </>
  );
}
