import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        renderCell: (params) => (
          <strong>
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => this.editRow(params.value)}
          >
              <EditIcon />
            </IconButton>
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => this.deleteRow(params.value)}
          >
              <DeleteForeverIcon />
            </IconButton>
          </strong>
        ),
      },
      {
        field: "picture",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => (
          <Avatar alt="Remy Sharp" src={params.value} />
        ),
      },
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
     
    ];

    this.state = {
      columns: columns,
      students: [], // Ban đầu students của mình là 1 mảng rỗng
      newStudent: [],
      displayStudents: [],
      selectedClass:props.selectedClass,
      className:'',
      openComfirmation:false,
      editStudent:null,
      editedStudent:null,
      totalStudents:0,
      maxID:1,
      openSnackbar:false,
      snackbarInfo:'',
      severity:'success',
      openEditor:false,
    };
  }

  editRow = (id) => {
    const editStudent = this.state.students.find(student => student.id === id)
    if(editStudent){
      this.setState({openEditor:true,editStudent:editStudent,editedStudent:editStudent})
    }
  }

  deleteRow = (id) => {
    const editStudent = this.state.students.find(student => student.id === id)
    // console.log('deleteRow',id,editStudent)
    if(editStudent){
      this.setState({openComfirmation:true,editStudent:editStudent})
    }
  }

  handleCloseConfirmation = (yes) => {
    // console.log('handleCloseConfirmation',yes) 
    this.setState({openComfirmation:false})
    if(yes){
      let students = [...this.state.students]
      students = students.filter((data) => data.id !== this.state.editStudent.id)
      const totalStudents = this.state.totalStudents - 1
      this.setState({students:students
        ,totalStudents:totalStudents
        ,openSnackbar:true
        ,snackbarInfo:'Xóa Sinh Viên Thành Công',
        severity:'success'
      })
      this.props.handleTotalStudents(totalStudents)
    }
  }

  handleSnackbarClose = () => {
    this.setState({openSnackbar:false})
  }
  handleClassChange = (selectedClass) => {
    // console.log("MyClass chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass });
  };

  handleCloseEditor = (yes) => {
    // console.log('handleCloseConfirmation',yes) 
    this.setState({openEditor:false})
    if(yes){
      console.log('HandleCloseConfirmation',this.state.editedStudent)
      console.log('HandleCloseConfirmation',this.state.editStudent)
      let students = [...this.state.students]
      students = students.filter(data => data.id !== this.state.editedStudent.id)
      students.push(this.state.editedStudent)
      this.setState({
        students:students,
        editedStudent:null,
        openSnackbar:true,
        snackbarInfo:'Edit thành công',
        severity:'success'
      })
    }else{
      this.setState({
        editStudent:null,
        editedStudent:null,
        openSnackbar:true,
      })
    }
  }

  setFirstNameValue = (event) => {
    // console.log('setFirstName',event.target.value)
    const editedStudent = {...this.state.editedStudent}
    editedStudent.firstName = event.target.value
    this.setState({editedStudent:editedStudent})
  }

  setLastNameValue = (event) => {
    const editedStudent = {...this.state.editedStudent}
    editedStudent.lastName = event.target.value
    this.setState({editedStudent:editedStudent})
  }

  setLastCountryValue = (event) => {
    const editedStudent = {...this.state.editedStudent}
    editedStudent.country = event.target.value
    this.setState({editedStudent:editedStudent})
  }

  static getDerivedStateFromProps(props,state){
    let totalStudents = 0
    if(!props.className || props.className===''){
      totalStudents = state.students.length
    }else{
      let displayStudents = [...state.students]
      displayStudents = displayStudents.filter((data) => data.className === props.className)
      totalStudents = displayStudents.length
    }
    if(props.className && props.newStudent.length>0){
      const students = [...state.students]
      const newStudent = props.newStudent[0]
      console.log(newStudent)
      let maxId = state.maxID
      console.log(maxId)

      newStudent.id = maxId
      newStudent.className = props.className
      newStudent.actions = newStudent.id
      students.push(newStudent)
      totalStudents++
      props.handleTotalStudents(totalStudents)
      console.log(state.students)
      return {selectedClass:props.className
        ,students:students
        ,newStudent:[]
        ,totalStudents:totalStudents
        ,maxID: maxId + 1
        ,openSnackbar:true
        ,snackbarInfo:'Thêm sinh viên thành công'  
      }

    }else{
      if(props.className !== state.selectedClass)
        props.handleTotalStudents(totalStudents)
      return {selectedClass:props.className,totalStudents:totalStudents}
    }
  }

  render() {
    // console.log('MyClass render students',this.state.students)
    let displayStudents = [...this.state.students];

    displayStudents = displayStudents.filter((data) => {
      return data.className === this.state.selectedClass
    })
    // console.log('MyClass render displayStudents',displayStudents)

    return (
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={displayStudents} columns={this.state.columns} />
        <Dialog
        open={this.state.openComfirmation}
        onClose={() => this.handleCloseConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn Chắc Chắn Là Xóa Sinh Viên Có Tên"} {this.state.editStudent?.firstName + ' Này?'} <Avatar alt="Remy Sharp" src={this.state.editStudent?.picture} /> 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hành Động Này Không Thể Khôi Phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseConfirmation(false)}>Hủy</Button>
          <Button onClick={() => this.handleCloseConfirmation(true)} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        open={this.state.openSnackbar}
        onClose={() => this.handleSnackbarClose()}
        message={this.state.snackbarInfo}
        key={{vertical:'bottom', horizontal:'right'}}
      >
          <MuiAlert onClose={() => this.handleSnackbarClose()} severity={this.state.severity} variant="filled" sx={{ width: '100%' }}> 
          {this.state.snackbarInfo}
          </MuiAlert>
      </Snackbar>
      <Dialog open={this.state.openEditor} onClose={() => this.handleCloseEditor(false)}>
        <DialogTitle>Chỉnh sửa sinh viên</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="Tên sinh viên"
            type="text"
            onChange = {(e) => this.setFirstNameValue(e)}
            defaultValue={this.state.editStudent?.firstName}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Họ"
            type="text"
            onChange = {(e) => this.setLastNameValue(e)}
            defaultValue={this.state.editStudent?.lastName}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="country"
            label="Quốc Gia"
            type="text"
            onChange = {(e) => this.setLastCountryValue(e)}
            defaultValue={this.state.editStudent?.country}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseEditor(false)}>Cancel</Button>
          <Button onClick={() => this.handleCloseEditor(true)}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default MyClass;
