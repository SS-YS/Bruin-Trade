import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

import { DataGrid } from '@mui/x-data-grid';
import BasicTimePicker from "./components/BasicTimePicker"
import NavigationBar from "./components/NavigationBar"
import SelectDiningHall from "./components/SelectDiningHall"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Notification from "./components/Notification";
import "./index.css"

const columns = [
  { field: 'id', headerName: "No.", width: 60, hide: true, disableColumnMenu: true },
  {
    field: 'seller',
    headerName: 'Seller',
    width: 120,
    disableColumnMenu: true,
    renderCell(params) {
      const findSeller = () => {
        sessionStorage.setItem("userDisplayed", params.getValue(params.id, "seller"));
      }
      return (
        <Link to="/user_info" onClick={findSeller} style={{ textDecoration: 'none' }}>
          {params.getValue(params.id, "seller")}
        </Link>
      )
    }
  },
  { field: 'rating', headerName: 'Rating', width: 100, disableColumnMenu: true },
  { field: 'diningHall', headerName: 'Dining Hall', width: 140, disableColumnMenu: true },
  { field: 'time', headerName: 'Time', width: 100, disableColumnMenu: true },
  { field: 'price', headerName: 'Price', width: 80, disableColumnMenu: true },
  {
    field: 'buy',
    headerName: 'Buy Swipe',
    sortable: false,
    disableColumnMenu: true,
    width: 120,
    renderCell(params) {
      const handleBuy = () => {
        const obj_id = params.getValue(params.id, "obj_id");

        const updateInfo = {
          _id: obj_id,
          inProgress: true,
          code: Math.floor(100000 + Math.random() * 900000),
          buyer: sessionStorage.getItem("username"),
        };
        axios.post("http://localhost:4000/app/update", updateInfo)
          .then(response => console.log(response.data))
        window.location.href = "home"
      }

      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 32, width: 100, height: 40, borderRadius: 5 }}
          onClick={handleBuy}
        >
          Buy
        </Button>
      );
    },
  },
  { field: 'obj_id', hide: true }
]

class BuyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: sessionStorage.getItem("username"),
      dinningHall: null,
      start_time: null,
      start_hour: null,
      end_time: null,
      end_hour: null,
      start_minute: null,
      end_minute: null,
      start_price: null,
      end_price: null,
      rows: [],
      alert: false,
      alertMessage: null,
      alertType: null,
    };

    this.handleDinningChange = this.handleDinningChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStartPriceChange = this.handleStartPriceChange.bind(this);
    this.handleEndPriceChange = this.handleEndPriceChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  generateRows = function (data) {
    var temp = this.state.rows;
    temp = Object.assign([], temp);
    temp = [];
    if (data.length === 0) {
      temp = [];
      this.setState({ rows: temp });
      this.setState({ 
        alert : true,
        alertMessage : "No match found.",
        alertType : "warning"
      });

    } else {
      for (let i = 0; i < data.length; i++) {
        const getRating = { userName: data[i].seller };
        axios
          .post("http://localhost:4000/app/getRating", getRating)
          // eslint-disable-next-line
          .then((response) => {
            let rating = response.data.rating;
            temp = Object.assign([], temp);

            let time_str = "";
            if (data[i].time >= 1000) {
              time_str = String(data[i].time).slice(0, 2) + ":" + String(data[i].time).slice(2, 4)
            }
            else {
              time_str = "0" + String(data[i].time).slice(0, 1) + ":" + String(data[i].time).slice(1, 3)
            }

            temp.push({
              id: i + 1,
              seller: data[i].seller,
              rating: rating,
              diningHall: data[i].location,
              price: data[i].price,
              time: time_str,
              obj_id: data[i]._id,
            });
            this.setState({ rows: temp });
          });
      }
    }
  };

  checkStartBeforeEnd(search_start_time, search_end_time) {
    const startTime = Number(this.state.start_hour + this.state.start_minute);
    const endTime = Number(this.state.end_hour + this.state.end_minute);

    if (startTime > endTime) {
      return true;
    }
    return false;
  }


  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  handleDinningChange(event) {
    this.setState({ dinningHall: event.target.value });
  }

  handleStartTimeChange(time) {
    if (time === null) {
      this.setState({
        start_time: null,
        start_hour: null,
        start_minute: null
      })
    }
    else {
      this.setState({
        start_time: time,
        start_hour: ('0' + time.getHours()).slice(-2),
        start_minute: ('0' + time.getMinutes()).slice(-2)
      })
    }
  }

  handleEndTimeChange(time) {
    if (time === null) {
      this.setState({
        end_time: null,
        end_hour: null,
        end_minute: null
      })
    }
    else {
      this.setState({
        end_time: time,
        end_hour: ('0' + time.getHours()).slice(-2),
        end_minute: ('0' + time.getMinutes()).slice(-2)
      })
    }
  }

  handleStartPriceChange(event) {
    this.setState({ start_price: event.target.value });
  }

  handleEndPriceChange(event) {
    this.setState({ end_price: event.target.value });
  }

  handleSearch(event) {
    var search_dinningHall;
    var search_start_time;
    var search_end_time;
    var search_start_price;
    var search_end_price;
    if (this.state.dinningHall === null) {
      search_dinningHall = ''
    }
    else 
    {
      search_dinningHall = this.state.dinningHall
    }
    if (this.state.start_time ===null) {
      search_start_time = 0
    }
    else {
      search_start_time = Number(this.state.start_hour + this.state.start_minute)
    }
    if (this.state.end_time ===null){
      search_end_time = 2400
    }
    else {
      search_end_time = Number(this.state.end_hour + this.state.end_minute)
    }
    if (this.state.start_price === null || this.state.start_price ===''){
      search_start_price = Number.MIN_VALUE
    }
    else 
    {
      if (isNaN(this.state.start_price)) {
        this.setState({ alert: true });
        this.setState({ alertMessage: "Please enter a valid start price." });
        this.setState({ alertType: "error" });
        event.preventDefault();
        return;
      } 
      search_start_price = Number(this.state.start_price)
    }
    if (this.state.end_price === null || this.state.end_price === ''){
      search_end_price = Number.MAX_VALUE
    }
    else {
      if (isNaN(this.state.end_price)) {
        this.setState({ alert: true });
        this.setState({ alertMessage: "Please enter a valid end price." });
        this.setState({ alertType: "error" });
        event.preventDefault();
        return;
      }
      search_end_price = Number(this.state.end_price)

    }
  
    if (search_start_time > search_end_time) {
      this.setState({ alert: true });
      this.setState({ alertMessage: "Please enter a valid time interval." });
      this.setState({ alertType: "error" });
      event.preventDefault();
    } else if (search_start_price > search_end_price) {
      this.setState({ alert: true });
      this.setState({ alertMessage: "Please enter a valid price interval." });
      this.setState({ alertType: "error" });
      event.preventDefault();
    } else {
      event.preventDefault();
      const interval = {
        seller: this.state.buyer,
        dinningHall: search_dinningHall,
        startTime: search_start_time,
        endTime: search_end_time,
        startPrice: search_start_price,
        endPrice: search_end_price,
      };
      axios
        .post("http://localhost:4000/app/searchOrder", interval)
        .then((response) => this.generateRows(response.data));

    }
  }

  closeAlert() {
    this.setState({ alert: false });
  }

  render() {
    this.redirect();

    return (
      <div>
        <Notification alert={this.state.alert}
          alertMessage={this.state.alertMessage}
          alertType={this.state.alertType}
          closeAlert={this.closeAlert} />
        <NavigationBar />

        <div className="buyPageSearchContainer">
          <form className="marginForm" onSubmit={this.handleSearch}>
            <label> Please select a dining hall： </label>
            <p />
            <SelectDiningHall value={this.state.dinningHall} onChange={this.handleDinningChange} />

            <p />
            <label> Please choose a time interval：</label>
            <p />
            <BasicTimePicker message="Choose a start time" value={this.state.start_time} onChange={this.handleStartTimeChange} />
            <label class="buyTimeRangeLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <BasicTimePicker message="Choose an end time" value={this.state.end_time} onChange={this.handleEndTimeChange} />

            <p />
            <label> Please enter a price range：</label>
            <p />
            <TextField label="Enter a start price" variant="outlined" value={this.state.start_price} onChange={this.handleStartPriceChange} />
            <label class="buyTimeRangeLabel">&nbsp;&nbsp;to&nbsp;&nbsp;</label>
            <TextField label="Enter a end price" variant="outlined" value={this.state.end_price} onChange={this.handleEndPriceChange} />

            <p />
            <Button type="submit" sx={{ marginTop: 1, height: 40 }} variant="contained">Search</Button>
          </form>
        </div>

        <div className="buyPageOrdersContainer">
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
}

export default BuyPage;
