import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import DeleteIcon from "@material-ui/icons/Delete";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import api from "../../api/index";
import Chip from '@mui/material/Chip';

export default function SimpleCard({text,date,Fid,Token,setFeedItems,setText,setUpdate,setValue,priority,setOpen,tags}) {
  const deleteitem = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${Token}`,
    };
      const request = await api.delete(`feed/${Fid}/`, { headers: headers });
      const feed = await api.get("feed/", { headers: headers });
      setFeedItems(feed.data);
      console.log(request);
  };

  const editItem = () => {
    setUpdate(Fid);
    setText(text);
    setOpen(true)
    setValue(text); 
};

const deleteItem = () => { 

}
  return (
    <Card sx={{ maxWidth: 900 }}>
      <CardHeader
        action={
          <>
          <Chip label={tags} onDelete={deleteItem} />
          <Chip label={priority} sx={{ ml: 3 }}/>
          <IconButton aria-label="settings" onClick={editItem}>
          <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <IconButton onClick={deleteitem}>
          <DeleteIcon />
          </IconButton>
          </>
        }
        subheader={text}
      />
      <Divider variant="middle" />

    </Card>
  );
}
