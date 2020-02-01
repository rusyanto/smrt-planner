import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  th: {
    color: '#fff',
    fontWeight: 'bold'
  }
}));

function createData(partNo, description, inventory, forecast, reorderQty, supplier) {
  return { partNo, description, inventory, forecast, reorderQty, supplier };
}

const rows = [
  createData('BL101', 'Brake Lines', 6.0, 24, 4.0, 'Hangzhou Kooying Auto Spare Parts Co., Ltd.'),
  createData('RT201', 'Rotors', 9.0, 37, 4.3, 'Chihon Machinery Co., Ltd.'),
  createData('CH301', 'Chain', 16.0, 24, 6.0, 'Indusware Trading & Supplier Pte Ltd.'),
  createData('CS401', 'Cassette', 3.7, 67, 4.3, 'Synergy Import And Export Co., Ltd.'),
  createData('SP501', 'Suspension', 16.0, 49, 3.9, 'Oem Automotive Pte Ltd.'),
];

function Home() {
  const classes = useStyles();
  const [strategy, setStrategy] = React.useState('cheapestPrice');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setStrategy(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth className={classes.formControl} margin="dense">
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
              Supplier Strategy
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={strategy}
              onChange={handleChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="cheapestPrice">Cheapest Price</MenuItem>
              <MenuItem value="timeFulfillment">Time for fulfillment</MenuItem>
              <MenuItem value="quality">Quality of goods</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: '#99ccee' }}>
            <TableRow>
              <TableCell className={classes.th}>Part No.</TableCell>
              <TableCell className={classes.th}>Description</TableCell>
              <TableCell className={classes.th} align="right">Inventory</TableCell>
              <TableCell className={classes.th} align="right">Forecast</TableCell>
              <TableCell className={classes.th} align="right">Re-Order Quantity</TableCell>
              <TableCell className={classes.th}>Suggested Supplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.partNo}>
                <TableCell>{row.partNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">{row.inventory}</TableCell>
                <TableCell align="right">{row.forecast}</TableCell>
                <TableCell align="right">{row.reorderQty}</TableCell>
                <TableCell>{row.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;
