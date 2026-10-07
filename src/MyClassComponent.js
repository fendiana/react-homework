import React, { Component } from "react";

class MyClassComponent extends Component {
  state = {
    todos: [],
    input: "",
    timer: 0,
  };

  // 1
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer + 1 }));
    }, [1000]);

    const lsTodos = localStorage.getItem("todos");
    if (lsTodos) {
      this.setState({ todos: JSON.parse(lsTodos) });
    } // перевірка щоб одразу не злетів додаток; на null, undefined, false
    console.log("conponentDidMount");
  }

  // 2
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log("conponentDidUpdate");
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
  }

  // методи
  addTask = () => {
    this.setState({ todos: [...this.state.todos, this.state.input] });
    this.setState({ input: "" });
  };

  onCHangeHandler = (e) => {
    const value = e.target.value;
    this.setState({ input: value });
  };

  handleClearStorage = () => {
    this.setState({ todos: [] });
  };

  // 3
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
        <h2>{this.state.timer}</h2>
        <input value={this.state.input} onChange={this.onCHangeHandler} />
        <button onClick={this.addTask}>Add Todo</button>
        <button onClick={this.handleClearStorage}>Clear Todo list</button>

        {this.state.todos.map((todo, index) => (
          <p key={index}>{todo}</p>
        ))}
      </>
    );
  }
}

export default MyClassComponent;

// методи в класових компонентах записуються за допомогою addTask()

// shouldComponentUpdate(nextProps, nextStates) {
//   if (this.props.name !== nextProps.name) {
//     // цей компонент повертає бульове значення
//     return true; // оновлення компонента, якщо властивість змінилась
//   }
//   return false; // не оновлювати компонент, якщо властивість не  змінилась
// }
