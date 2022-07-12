import React from "react";

export default class GraphSelector extends React.Component {
    render() {
        return <input type="button" onClick={this.props.onClick} value="Skift graf" />
    }
}