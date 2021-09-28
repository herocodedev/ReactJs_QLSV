import './App.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

class CompoClasses extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        selectedClass: '',
        data:[
            { name: 'Lớp 12 A1', year: 2020 },
            { name: 'Lớp 12 A2', year: 2021 },
        ]
    }
  }

  handleChange = (event,value) => {
    console.log('CompoClasses chọn: ',value)
    this.setState({selectedClass:value?.name})
    this.props.handleChange(value?.name)
  }


  render(){
    return (
      <div>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={this.state.data}
            getOptionLabel = {(option) => option.name}
            sx={{ width: 200 }}
            onChange = {(event,value) => this.handleChange(event,value)}
            style={{background:'#7ee8fa'}}
            renderInput={(params) => <TextField {...params} label="Lớp Học" variant='outlined' placeholder="Chọn lớp"/>}
        />
      </div>

    )
  }

}

export default CompoClasses;
