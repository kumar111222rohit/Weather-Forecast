import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';
import cityList from '../cityMetadata'


const SearchBar = styled.form`
  top: ${({showResult}) => (showResult ? '0%' : '30%')};
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  transition: 0.8s 0.5s;
  @media ${deviceConfiguration.laptopL} {
    max-width: 600px;
  }
  @media ${deviceConfiguration.desktop} {
    max-width: 700px;
  }
`;
const
    SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${deviceConfiguration.tablet} {
    font-size: 18px;
  }
  @media ${deviceConfiguration.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

export default  class SearchCity extends React.Component {
  constructor(props) {
    super(props)
    this.cityList=cityList;
    this.state={
      suggestions:[],
      text:''
    }

  }
  onTextChanged = (e) => {
    const value = e.target.value
    console.log(value)
    let suggestions=[]
    if(value.length>0){
      const regex=new RegExp(`^${value}`,'i')
      suggestions=this.cityList.sort().filter(v=>regex.test(v))
    }
    this.setState(()=>({suggestions,text:value}))
    this.props.change(this.state.text,e)
  }
  suggestionsSelected = (value,e) => {
    console.log("option clicked")
    this.setState(() => ({
      text: value,
      suggestions: []

    }))
    this.props.submit(value,e)
  }
  renderSuggestions=()=>{
    const {suggestions}=this.state
    if(suggestions.length===0){
      return null;
    }
    return(
        <ul style={{listStyle: 'none',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '20px'}}>
          {suggestions.map((item,index)=> <li style={{padding: '5px'}} key={index} onClick={(e)=>this.suggestionsSelected(item,e)}>{item}</li>)}
        </ul>
    )
  }

  render() {
    const text=this.state.text
    console.log(text)
    return (
        <div>
          <SearchBar showResult={this.props.showResult} onSubmit={(e)=>this.props.submit(this.state.text,e)}>
            <SearchInput type="text" value={text} placeholder="Enter city" onChange={this.onTextChanged}/>
            {/*<SearchInput type="text" value={text} onChange={this.props.change} placeholder="Enter city"/>*/}


            {this.renderSuggestions()}
          </SearchBar>
        </div>
    );
  }
}
SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
};