import React, { Component } from "react";

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      id: "",
      title: "",
      long_url: "",
      short_url: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.clearInputs();
    const newURL = {
      title: this.state.title,
      long_url: this.state.long_url,
    };
    this.props.addNewUrl(newURL);
  };

  clearInputs = () => {
    this.setState({ title: "", long_url: "" });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Title..."
          name="title"
          value={this.state.title}
          onChange={this.handleNameChange}
        />

        <input
          type="text"
          placeholder="URL to Shorten..."
          name="long_url"
          value={this.state.long_url}
          onChange={this.handleNameChange}
        />

        <button onClick={(e) => this.handleSubmit(e)}>Shorten Please!</button>
      </form>
    );
  }
}

export default UrlForm;
