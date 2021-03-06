import React,{useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import api from "../../api";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


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
}) {
  const handleClose = () => setOpen(false);
  const [arrays, setArrays] = useState([]);


  async function makepost() {
    const data = { status_text: text, priority: priority, tags: arrays.join() };
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
    setOpen(false)
    setArrays([])
    return request.data;
  }

  async function updatepost() {
    const data = { status_text: text, priority: priority, tags: arrays.join() };
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
    setOpen(false)
    setArrays([])
    return request.data;
  }
  

  const postForm =(e)=>{
    e.preventDefault()
    update?updatepost():makepost()
  }
  const deleteItem = () =>{
    setArrays([])
    setTags('')
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={postForm} noValidate>
          <Typography variant="h6" component="h6">
            Text Title
          </Typography>
          <TextField
            id="filled-full-width"
            required
            placeholder="Text Title*"
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
              <Button variant="contained" size="small" onClick={()=>setPriority("High")}>
                High
              </Button>
              <Button variant="contained" size="small" onClick={()=>setPriority("Medium")}>
                Medium
              </Button>
              <Button variant="contained" size="small" onClick={()=>setPriority("Low")}>
                Low
              </Button>
              
            </div>
          </Box>

          <Typography variant="h6" component="h6" sx={{ mt: 1 }}>
            Lables
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={9}>
              <TextField
                fullWidth
                id="outlined-basic"
                placeholder="Lable"
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
                onClick={()=>setArrays((arrays)=>[...arrays,tags])}
                sx={{ mt: 1 }}
              >
                Add
              </Button>
              {console.log(arrays)}
            </Grid>
            
            {arrays?arrays.map((arr)=>(
              <Grid item sx={{ mt: 1 }}>
                {arr===""?null:<Chip label={arr} />}  
              </Grid>
            )):null }
          {arrays.length>0?<Grid item sx={{ mt: 1 }}>
          <IconButton onClick={deleteItem}>
          <ClearIcon />
          </IconButton>
          </Grid>:null}
            <Grid item xs={12} sx={{ mt: 1 }}>
              {update?<Button type= "submit" fullWidth variant="contained" >
                UPDATE TASK{" "}</Button>:
                <Button type= "submit" fullWidth variant="contained">
                ADD NEW TASK{" "}</Button>}
              
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
