import React, { forwardRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import domo from 'ryuu.js';
import MaterialTable from 'material-table';
import MuiAlert from '@material-ui/lab/Alert';
// Material-UI core
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
// Material table icons
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';
import Backup from '@material-ui/icons/Backup';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  buttons: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    textAlign: 'right',
  },
  button: {
    paddingRight: 8,
  }
}));

function Home() {
  const classes = useStyles();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState('This is a success message!');
  const [msgError, setMsgError] = useState('This is an error message!');
  
  const [state, setState] = useState({
    columns: [
      { title: 'MPN', field: 'materialNo', editable: 'onUpdate' },
      { title: 'Description', field: 'description', editable: 'onUpdate' },
      { title: 'FY20W06', field: 'cw0', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W07', field: 'cw1', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W08', field: 'cw2', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W09', field: 'cw3', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W10', field: 'cw4', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W11', field: 'cw5', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W12', field: 'cw6', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W13', field: 'cw7', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W14', field: 'cw8', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W15', field: 'cw9', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W16', field: 'cw10', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W17', field: 'cw11', editable: 'onUpdate', type: 'numeric' },
      { title: 'FY20W18', field: 'cw12', editable: 'onUpdate', type: 'numeric' }
    ],
    data: [],
  });

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleSubmit = event => {
    let contents = [];
    let updateTime = new Date().toISOString();
    state.data.forEach(record => {
      record.updateTime = updateTime;
      contents.push({ content: record });
    });

    setIsSubmitting(true);
    domo.post(`/domo/datastores/v1/collections/smrtPlanner/documents/bulk1`, contents)
      .then(resp => {
        setMsgSuccess('Forecast successfully submitted!')
        setOpenSuccess(true);
      })
      .catch(err => {
        setMsgError(err.name + ': ' + err.message);
        setOpenError(true);
      })
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    domo.get(`/data/v1/forecastCalculated`)
      .then(data => {
        setState(prevState => {
          return { ...prevState, data };
        });
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <MaterialTable
          icons={tableIcons}
          title="Forecast EOH"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    return { ...prevState, data };
                  });
                }, 600)
              }),
          }}
          style={{ padding: 8 }}
          isLoading={isLoading}
          options={{ pageSize: 5 }}
        />
      </Grid>
      <Grid item xs={12} className={classes.buttons}>
        {isSubmitting ? (
          <CircularProgress style={{ padding: '0 40px' }} />
        ) : (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            <Backup className={classes.button} />Submit
          </Button>
        )}
      </Grid>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          {msgSuccess}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {msgError}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Home;
