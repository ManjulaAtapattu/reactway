import React from "react";
import Autocomplete from "react-autocomplete";
import provinces from '../data/provices.json';

export default class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedProvince: null,
      key: ''
    };
  }

  componentDidMount() {
    this.input.focus();
    this.input.setSelectionRange(6, 11);
    this.getData();
  }

  getData = (key = "") => {
    // fetch(`/api?keyword=${key}`)
    //   .then((result) => JSON.parse(result))
    //   .then((data) => this.setState({ provinces: data }))
    //   .catch((err) => console.log(err));
    this.setState({ data: provinces });
  };

  onChange = (e) => {
      const key = e.target.value.toLowerCase();
        const data = provinces.filter(x => {
            if (!key) return true;
            return x.name.toLowerCase().includes(key);
        });

        this.setState({ data, key });
  }

  render() {
    const { data, key } = this.state;

    return (
      <div className="App">
        <Autocomplete
          ref={(el) => (this.input = el)}
          items={data}
          getItemValue={(item) => item.name}
          renderItem={(item, isHighlighted) => (
            <div key={item.abbreviation} style={{ background: isHighlighted ? "lightgray" : "black" }}>
              {item.name}
            </div>
          )}
          value={key}
          onChange={this.onChange}
          onSelect={(val) => this.setState({ selectedProvince: val })}
        />
      </div>
    );
  }
}
