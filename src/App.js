/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { jsPDF } from "jspdf";
import img from './12.png';
import img2 from './13.png';
import img3 from './14.jpeg';
import {Email} from './smtp';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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
  const [value, setValue] = React.useState(0);
  let isEmail =false;
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  const sendemail=async()=>{
  isEmail=true;
  let canvas = generatePDF()
  var base64 = canvas.output('datauristring');
    Email.send({
      SecureToken: "7bfbd54c-573d-4c21-9f5b-fc63a8bfd395",
      To: 'shreyashshetty1997@gmail.com',
      From: "shreyashshetty1997@gmail.com",
      Subject: "Analytics Report",
      Body: "Please find attached documents",
      Attachments : [
        {
          name : "doc.pdf",
          data : base64
        }]
    }).then(
      alert("Email is sent successfully")
    ).catch(
      e => alert(e)
    )
    ;
  }

  const generatePDF = () => {

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
    if(isEmail)
    {
      isEmail=false;
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
        <Button variant="contained" onClick={generatePDF} color="primary">
          Download PDF
        </Button>&nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={sendemail} color="primary">
          Share via email
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
    </div>
  );
}
