import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";

let mountNode = document.getElementById("root");

// The first decision we need to make in a React application is the component structure (what components to create), how many components to use and what each component should describe
// Start wtih what makes sense right now, Rename/Delete later.

// Our application will be a list og github cards, so the components we'll need are:
// 1. Card
// 2. The list itself

const CardList = (props) => (
    <div>
        {props.profiles.map((profile) => (
            <Card key={profile.id} {...profile} />
        ))}
    </div>
);

// {testData.map((profile) => (<Card {...profile} />))} in the code above is converting testData object into something like below:
// [<Card />, <Card />, <Card />]
// [React.createElement(), React.createElement(), React.createElement()]

class Card extends React.Component {
    render() {
        const profile = this.props; // this keyword in here refers to an instance of the card component
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = { userName: "" };
    handleSubmit = async (event) => {
        // without preventDefault on submit even our page is going to refresh
        event.preventDefault();
        const resp = await axios.get(
            `https://api.github.com/users/${this.state.userName}`
        );
        this.props.onSubmit(resp.data);
        this.setState({ userName: "" });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={(event) =>
                        this.setState({ userName: event.target.value })
                    }
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    // constructor
    // this

    state = {
        profiles: [],
    };

    addNewProfile = (profileData) => {
        this.setState((prevState) => ({
            profiles: [...prevState.profiles, profileData],
        }));
    };

    // each component in react is required to have a render() function (a class can have as many functions as needed, but render function is required)
    render() {
        // the render function returns the virtual dom description of your component
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
