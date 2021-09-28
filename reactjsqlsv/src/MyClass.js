import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment';
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
        field: "firstName",
        headerName: "Tên",
        width: 150,
      },
      {
        field: "lastName",
        headerName: "Họ",
        width: 150,
      },
      {
        field: "phone",
        headerName: "Số điện thoại",
        width: 150,
      },
      {
        field: "dob",
        headerName: "Ngày Sinh",
        width: 150,
      },
      {
        field: "country",
        headerName: "Quốc gia",
        width: 150,
      },
      {
        field: "picture",
        headerName: "Avatar",
        width: 150,
      },
    ];

    this.state = {
      columns: columns,
      students: [],
      displayStudents: [],
    };
    console.log("Props.students", props.students);
  }

  handleClassChange = (selectedClass) => {
    console.log("MyClass chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        const dataNew = data.results.map((child, index) => {
          return {
            id: index++,
            firstName: child.name.first,
            lastName: child.name.last,
            phone: child.phone,
            dob:moment(child.dob.date).format('DD/MM/YY'),
            country:child.location.country,
            picture:child.picture.medium
          };
        });
        this.setState({ students: dataNew, displayStudents: dataNew });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const displayStudents = [...this.state.students];
    return (
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={displayStudents} columns={this.state.columns} />
      </div>
    );
  }
}

export default MyClass;
