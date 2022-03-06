import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Redirect } from "react-router";
import Card from "../card/card";
import Button from "@mui/material/Button";
import BasicModal from "../modal/modal";
import api from "../../api/index";



export default function Feed({ Token }) {
  const [feedItems, setFeedItems] = useState("");
  const [users, setUsers] = useState("");
  const [text, setText] = useState("");
  const [update, setUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("Low");
  const [tags, setTags] = useState("");
  const [value, setValue] = useState("");
  const [tagArray, setTagArray] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await api.get("feed/", {
        headers: { Authorization: `Token ${Token}` },
      });
      console.log(request.data);
      setFeedItems(request.data);
      fetchUser();
      return request.data;
    }
    async function fetchUser() {
      const request = await api.get(`profile/`);
      console.log(request.data);
      setUsers(request.data);
      return request.data;
    }

    if (Token) {
      fetchData();
    }
  }, [Token]);

  return (
    <div>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={9.5}>

            <h2>Welcome to your task list !</h2>
          </Grid>
          <Grid item md={2.4}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              CREATE NEW TASK
            </Button>
          </Grid>
        </Grid>
      </Container>
      <BasicModal
        open={open}
        setOpen={setOpen}
        Token={Token}
        setFeedItems={setFeedItems}
        setText={setText}
        update={update}
        setUpdate={setUpdate}
        setPriority={setPriority}
        priority={priority}
        setTags={setTags}
        tags={tags}
        value={value}
        setValue={setValue}
        text={text}
        tagArray={tagArray}
        setTagArray={setTagArray}
      />
      <Container maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={4}>
          {Token ? (
            feedItems && users ? (
              feedItems
                .slice(0)
                .reverse()
                .filter(
                  (feeditem) =>
                    feeditem.user_profile ===
                    users.find(
                      (user) => user.email === localStorage.getItem("email")
                    ).id
                )
                .map((feedItem) => (
                  <Grid item key={feedItem.id} xs={12} sm={12} md={12}>
                    <Card
                      text={feedItem.status_text}
                      priority={feedItem.priority}
                      tags={feedItem.tags}
                      Token={Token}
                      Pid={localStorage.getItem("email")}
                      Fid={feedItem.id}
                      setFeedItems={setFeedItems}
                      setText={setText}
                      update={update}
                      setUpdate={setUpdate}
                      value={value}
                      setValue={setValue}
                      setOpen={setOpen}
                    />
                  </Grid>
                ))
            ) : (
              <div>Loading...</div>
            )
          ) : (
            <Redirect to="redirect/" />
          )}
        </Grid>
      </Container>
    </div>
  );
}
