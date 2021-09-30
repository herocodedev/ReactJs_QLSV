// import logo from './logo.svg';
import "./App.css";
import React from "react";
import MyAppBar from "./MyAppBar";
import MyClass from "./MyClass";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedClass: "", newStudent: [], className: "",totalStudents:0 };
  }

  handleSelectedClassChange = (selectedClass) => {
    // console.log("App chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass, newStudent: [] });
  };

  handleAddStudent = () => {
    // console.log('App Them Sinh Vien Vao Lớp: ',this.state.selectedClass)
    if (this.state.selectedClass) this.addNewStudent();
  };

  addNewStudent = () => {
    console.log('addNewStudent')
    fetch("https://randomuser.me/api/?results=1")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      const dataNew = data.results.map((child, index) => {
        return {
          id: index + 1,
          firstName: child.name.first,
          lastName: child.name.last,
          phone: child.phone,
          dob:moment(child.dob.date).format('DD/MM/YY'),
          country:child.location.country,
          picture:child.picture.medium
        };
      });
      console.log("dataNew: ",dataNew)
      // console.log('App Selected Class',this.state.selectedClass )
      this.setState({
        newStudent: dataNew,
        className:this.state.selectedClass
      });
    })
    .catch((err) => console.log(err));
    
  };

  handleTotalStudents = (totalStudents) => {
    console.log('handleTotalStudents: ',totalStudents)
    this.setState({totalStudents:totalStudents,newStudent:[]})
  }

  render() {
    return (
      <div>
        <MyAppBar
          handleSelectedClassChange={this.handleSelectedClassChange}
          handleAddStudent={this.handleAddStudent}
          totalStudents = {this.state.totalStudents}
        />
        <br />
        <MyClass
          newStudent={this.state.newStudent}
          className={this.state.selectedClass}
          selectedClass={this.state.selectedClass}
          handleTotalStudents={this.handleTotalStudents}
        />
      </div>
    );
  }
}

export default App;
