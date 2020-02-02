import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
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

function Home() {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} fontSize="small" />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} fontSize="small" />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} fontSize="small" />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} fontSize="small" />),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} fontSize="small" />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const [state, setState] = React.useState({
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
    data: [
      {
        materialNo: '6008424', description: 'Cover - Timing',
        cw0: 0, cw1: 0, cw2: 0, cw3: 0, cw4: 0, cw5: 0, cw6: 0, cw7: 0, cw8: 0, cw9: 0, cw10: 0, cw11: 0, cw12: 0
      },
      {
        materialNo: '6004211', description: 'CM Shock Absorber: Rear,DAF SB220',
        cw0: 0, cw1: 0, cw2: 0, cw3: 0, cw4: 0, cw5: 0, cw6: 0, cw7: 0, cw8: 0, cw9: 0, cw10: 0, cw11: 0, cw12: 0
      },
      {
        materialNo: '7332121010', description: 'Glass-rr Or drop RH',
        cw0: 0, cw1: 0, cw2: 0, cw3: 0, cw4: 0, cw5: 0, cw6: 0, cw7: 0, cw8: 0, cw9: 0, cw10: 0, cw11: 0, cw12: 0
      },
      {
        materialNo: '6906043040', description: 'Lock Assy: Door R/L, for Toyota Taxi',
        cw0: 0, cw1: 0, cw2: 0, cw3: 0, cw4: 0, cw5: 0, cw6: 0, cw7: 0, cw8: 0, cw9: 0, cw10: 0, cw11: 0, cw12: 0
      },
      {
        materialNo: '6001581', description: 'Valve - Intake',
        cw0: 0, cw1: 0, cw2: 0, cw3: 0, cw4: 0, cw5: 0, cw6: 0, cw7: 0, cw8: 0, cw9: 0, cw10: 0, cw11: 0, cw12: 0
      },
    ],
  });

  return (
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
    />
  );
}

export default Home;
