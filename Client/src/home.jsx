import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from "./components/NavigationBar"
import axios from "axios";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: "No.", hide: true, disableColumnMenu: true },
  { field: 'diningHall', headerName: 'Dining Hall', width: 140, disableColumnMenu: true },
  { field: 'time', headerName: 'Time', width: 100, disableColumnMenu: true },
  { field: 'price', headerName: 'Price', width: 80, disableColumnMenu: true },
  { field: 'status', headerName: 'Status', width: 130, disableColumnMenu: true },
  {
    field: 'detail',
    headerName: 'Detail',
    sortable: false,
    disableColumnMenu: true,
    width: 120,
    renderCell(params) {
      const handleDetail = () => {
        const obj_id = params.getValue(params.id, "obj_id");
        sessionStorage.setItem("order", obj_id);
        window.location.href = "order"
        console.log(obj_id)
      }  

      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ margin: 16, width: 100, height: 40, borderRadius: 5 }}
          onClick={handleDetail}
        >
          Details
        </Button>
      );
    },
  },
  { field: 'obj_id', hide: true }
]

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      username: sessionStorage.getItem("username"),
      rows : [],
    }
    this.getInfo()
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  getInfo() {
    const userInfo = {
      user: this.state.username,
    }
    axios.post("http://localhost:4000/app/getOnGoing", userInfo)
    .then(response=> this.generateRows(response.data))
  }

  generateRows(data) {
    var temp = this.state.rows;
    temp = Object.assign([], temp);
    temp = [];
    for (let i = 0; i < data.length; i++){
      console.log(data[i])
      let time_str = "";
            if(data[i].time>=1000){
              time_str = String(data[i].time).slice(0,2) + ":"+ String(data[i].time).slice(2,4)
            }
            else{
              time_str = "0"+String(data[i].time).slice(0,1) + ":"+ String(data[i].time).slice(1,3)
            }
      var status = "On Sale"
      if (data[i].inProgress){
        status = "In Progress";
      }
      if (data[i].finished){
        status = "Completed";
      }
      temp = Object.assign([], temp);
      temp.push(
        {
          id : i + 1,
          diningHall: data[i].location,
          price : data[i].price,
          time : time_str,
          status : status,
          obj_id: data[i]._id,
        }
      );
      this.setState({ rows: temp });
    }
  }

  render() {
    this.redirect();
    return (
      <div>
        <NavigationBar />
        <div>
          <h5 className="buyPageTitle">
            My Orders
          </h5>
        </div>
        <div className="homePageOrdersContainer">
          <div style={{ height: 425 }}>
            <DataGrid
              rows={this.state.rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;