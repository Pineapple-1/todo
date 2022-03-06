import React,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import api from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};
const tb = {
  height: "80%"
};


export default function BasicModal({
  open,
  setOpen,
  Token,
  setFeedItems,
  text,
  setText,
  update,
  setUpdate,
  value,
  setValue,
  setPriority,
  priority,
  setTags,
  tags,
  tagArray,
  setTagArray
}) {
  const handleClose = () => setOpen(false);
  const [array, setArray] = useState('');

  async function makepost() {
    const data = { status_text: text, priority: priority, tags: tags };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${Token}`,
    };
    console.log(data);
    const request = await api.post("feed/", data, { headers: headers });
    const req = await api.get("feed/", { headers: headers });
    setFeedItems(req.data);
    setValue("");
    setText("");

    return request.data;
  }

  async function updatepost() {
    const data = { status_text: text, priority: priority, tags: tags };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${Token}`,
    };
    const request = await api.put(`feed/${update}/`, data, {
      headers: headers,
    });
    const req = await api.get("feed/", { headers: headers });
    setFeedItems(req.data);
    setUpdate("");
    setValue("");
    setText("");
    return request.data;
  }
  const makeTags = () =>{

    setArray(tags)
    console.log(array)
    setTags(array+tags)

    console.log(tags)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={makepost} noValidate>
          <Typography variant="h6" component="h6">
            Text Title
          </Typography>
          <TextField
            id="filled-full-width"
            label="Todo"
            required
            placeholder="Placeholder"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={value}
            size="small"
            onChange={(e) => {
              setValue(e.target.value)
              setText(e.target.value);
            }}
          />
          <Typography variant="h6" component="h6" sx={{ mt: 1 }}>
            Priority
          </Typography>
          <Box sx={{ "& button": { m: 1 } }}>
            <div>
              <Button size="small" onClick={()=>setPriority("High")}>
                High
              </Button>
              <Button size="small" onClick={()=>setPriority("Medium")}>
                Medium
              </Button>
              <Button size="small" onClick={()=>setPriority("Low")}>
                Low
              </Button>
            </div>
          </Box>

          <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
            Lables
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={9}>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                label="Lables"
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                style={{ marginTop: "10px" }}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={makeTags}
                sx={{ mt: 1 }}
              >
                Add
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              {update?<Button type= "submit" fullWidth variant="contained" >
                UPDATE TASK{" "}</Button>:
                <Button fullWidth variant="contained">
                ADD NEW TASK{" "}</Button>}
              
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
