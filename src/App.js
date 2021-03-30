/* eslint-disable */
import React from 'react';
import TabPanel from'./TabPanel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { jsPDF } from "jspdf";
import img from './12.png';
import img2 from './13.png';
import img3 from './14.jpeg';
import {Email} from './smtp';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//regex to validate email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  buttons:{
    flexGrow: 1,
    float:"right"
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const[error,setError]= React.useState(true);
  const[emailId,setEmailId]= React.useState('test');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeEmailId=(e) => {
    setEmailId(e.target.value);
    validateEmail(e.target.value) ? setError(false) : setError(true)

  };

  const sendEmail=()=>{
  let canvas = generatePDF()
  var base64 = canvas.output('datauristring');
    Email.send({
      SecureToken: "7bfbd54c-573d-4c21-9f5b-fc63a8bfd395",
      To: emailId,
      From: "shreyashshetty1997@gmail.com",
      Subject: "Analytics Report",
      Body: "Please find attached documents",
      Attachments : [
        {
          name : "doc.pdf",
          data : base64
        }]
    }).then((message)=>{
      if (message=="OK"){
      alert(`Email is sent successfully to ${emailId}. Kindly check you Spam Folder if email is not present in Inbox`)
      }
      else{
        alert(message)
      }}
    ).catch(
      e => alert(e)
    );
    setOpen(false);
  }

  const generatePDF = (event) => {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.text(10, 20, 'First Image');
    var h1=50;
    doc.addImage(img, 'PNG', 10, h1)
    doc.addPage();
    doc.text(10, 20, 'Second Image');
    doc.addImage(img2, 'PNG', 10, h1)
    doc.addPage();
    doc.text(10, 20, 'Third Image');
    doc.addImage(img3, 'PNG', 10, h1)
    doc.text(20, 100, 'This is the thrid title.')
    if(!event)
    {
        return doc
    }
    doc.save('demo.pdf');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <div className={classes.buttons}>
      <Button variant="contained" onClick= {()=>{setOpen(true)}}color="primary">
          Share via email
        </Button>&nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={generatePDF} color="primary">
          Download PDF
        </Button>

      </div>
      <TabPanel value={value} index={0}>
      <img src={img} alt="ss"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <img src={img2} alt="ss"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <img src={img3} alt="ss"/>
      </TabPanel>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
           Emter your Email Id
          </DialogContentText>
          <TextField
            error={error}
            helperText={error && "Add valid Email Id"}
            autoFocus
            margin="dense"
            id="name"
            value={emailId}
            onChange={changeEmailId}
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendEmail} disabled={error} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
