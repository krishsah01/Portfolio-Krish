import React, { Component } from "react";

import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    wordLength: 5, 
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: "", 
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    this.fetchWord();
  }

  async fetchWord() {
    try {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${this.props.wordLength}`
      );
      const data = await response.json();
      this.setState({ answer: data[0] });
    } catch (error) {
      console.error("Error fetching word:", error);
      this.setState({ answer: "error" });
    }
  }

  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: "",
    }, this.fetchWord);
  }

  guessedWord() {
    const { answer, guessed } = this.state;
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {ltr}
      </button>
    ));
  }

  render() {
    const { nWrong, answer } = this.state;
    const { images, maxWrong } = this.props;

    let alternateText = `${nWrong} wrong guesses`;

    return (
      <div className="w-full max-w-md mx-auto p-5 text-center text-black">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-start">
          <img 
            className="max-w-full border-4 border-white shadow-lg rounded-lg mx-auto" 
            src={images[nWrong]} 
            alt={alternateText} 
          />
    
          <div className="flex flex-col items-center text-white space-y-4">
            <p className="text-lg font-medium">Number Wrong: {nWrong}</p>
    
            {answer === "" ? (
              <p className="text-lg">Loading...</p>
            ) : answer === this.guessedWord().join("") ? (
              <p className="text-2xl font-bold text-green-400">You WIN!</p>
            ) : nWrong === maxWrong ? (
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-red-400">YOU LOSE</p>
                <p className="text-lg">Correct Word is: {answer}</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-2xl font-mono tracking-wider">{this.guessedWord().join(" ")}</p>
                <div className="grid grid-cols-6 sm:grid-cols-7 gap-1 justify-center max-w-xs mx-auto">
                  {this.generateButtons()}
                </div>
              </div>
            )}
            
            <button 
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all w-40 text-lg mt-4"
              onClick={this.resetGame}
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default Hangman;