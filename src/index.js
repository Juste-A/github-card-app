import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

let mountNode = document.getElementById("root");

// The first decision we need to make in a React application is the component structure (what components to create), how many components to use and what each component should describe
// Start wtih what makes sense right now, Rename/Delete later.

// Our application will be a list og github cards, so the components we'll need are:
// 1. Card
// 2. The list itself

const testData = [
    {
        name: "Dan Abramov",
        avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
        company: "@facebook",
    },
    {
        name: "Sophie Alpert",
        avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
        company: "Humu",
    },
    {
        name: "Sebastian Markbåge",
        avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
        company: "Facebook",
    },
];

const CardList = (props) => (
    <div>
        {props.profiles.map((profile) => (
            <Card {...profile} />
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
    render() {
        return (
            <form action="">
                <input type="text" placeholder="GitHub username" />
                <button>Add card</button>
            </form>
        );
    }
}

class App extends React.Component {
    // constructor
    // this

    constructor(props) {
        super(props);
        this.state = {
            profiles: testData,
        };
    }

    // each component in react is required to have a render() function (a class can have as many functions as needed, but render function is required)
    render() {
        // the render function returns the virtual dom description of your component
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form />
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

ReactDOM.render(<App title="The GitHub Cards App" />, mountNode);
