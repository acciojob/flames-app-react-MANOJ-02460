import React, { Component } from "react";
import '../styles/App.css';

export const FLAMES_RESULT_MAP = {
    1: 'Friends',
    2: 'Love',
    3: 'Affection',
    4: 'Marriage',
    5: 'Enemy',
    0: 'Siblings'
};

export const removeCommonLetters = (firstName = '', secondName = '') => {
    const first = String(firstName || '');
    const second = String(secondName || '');

    const firstCounts = {};
    const secondCounts = {};

    for (const char of first) {
        firstCounts[char] = (firstCounts[char] || 0) + 1;
    }

    for (const char of second) {
        secondCounts[char] = (secondCounts[char] || 0) + 1;
    }

    const commonCounts = {};
    const sharedChars = new Set([...Object.keys(firstCounts), ...Object.keys(secondCounts)]);

    for (const char of sharedChars) {
        commonCounts[char] = Math.min(firstCounts[char] || 0, secondCounts[char] || 0);
    }

    const removeMatches = (text, counts) => {
        const remainingCounts = { ...counts };
        const result = [];

        for (const char of text) {
            if ((remainingCounts[char] || 0) > 0) {
                remainingCounts[char] -= 1;
                continue;
            }
            result.push(char);
        }

        return result.join('');
    };

    return {
        first: removeMatches(first, commonCounts),
        second: removeMatches(second, commonCounts)
    };
};

export const getFlamesResult = (firstName = '', secondName = '') => {
    const first = String(firstName || '').trim();
    const second = String(secondName || '').trim();

    if (!first || !second) {
        return 'Please Enter valid input';
    }

    const { first: firstRemaining, second: secondRemaining } = removeCommonLetters(first, second);
    const remainingLettersCount = `${firstRemaining}${secondRemaining}`.replace(/\s+/g, '').length;
    const resultIndex = remainingLettersCount % 6;

    return FLAMES_RESULT_MAP[resultIndex] || 'Please Enter valid input';
};

class App extends Component {
    state = {
        name1: "",
        name2: "",
        answer: "",
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        this.setState({ answer: getFlamesResult(this.state.name1, this.state.name2) });
    };

    clearFields = () => {
        this.setState({ name1: "", name2: "", answer: "" });
    };

    render() {
        return (
            <div id="main">
                {/* Do not remove the main div */}
                <div>
                    <input data-testid='input1' name="name1"
                        value={this.state.name1}
                        onChange={this.handleChange}
                    />

                    <input data-testid='input2'
                        name="name2"
                        value={this.state.name2}
                        onChange={this.handleChange}
                    />

                    <button data-testid="calculate_relationship" name="calculate_relationship"
                        onClick={this.handleSubmit} type="button">
                        Calculate Relationship Future
                    </button>
                    <button data-testid="clear" name="clear" onClick={this.clearFields} type="button">Clear</button>
                </div>
                <h3 data-testid="answer">{this.state.answer}</h3>
            </div>
        )
    }
}

export default App;
