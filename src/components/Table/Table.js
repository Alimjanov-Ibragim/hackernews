import React, { Component } from "react";
import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import { sortBy } from "lodash";
import classNames from "classnames";

const largeColumn = {
  width: "40%"
};

const midColumn = {
  width: "30%"
};

const smallColumn = {
  width: "10%"
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": sortKey === activeSortKey
  });
  return (
    <Button className={sortClass} onClick={() => onSort(sortKey)}>
      {children}
    </Button>
  );
};

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: "40%" }}>
            <Sort
              activeSortKey={sortKey}
              sortKey={"TITLE"}
              onSort={this.onSort}
            >
              Заголовок
            </Sort>
          </span>
          <span style={{ width: "30%" }}>
            <Sort
              activeSortKey={sortKey}
              sortKey={"AUTHOR"}
              onSort={this.onSort}
            >
              Автор
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort
              activeSortKey={sortKey}
              sortKey={"COMMENTS"}
              onSort={this.onSort}
            >
              Комментарии
            </Sort>
          </span>
          <span style={{ width: "10%" }}>
            <Sort
              activeSortKey={sortKey}
              sortKey={"POINTS"}
              onSort={this.onSort}
            >
              Очки
            </Sort>
          </span>
          <span style={{ width: "10%" }}>Архив</span>
        </div>
        {reverseSortedList.map(item => (
          <div className="table-row" key={item.objectID}>
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-online"
              >
                Отбросить
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

Table.propTypes = {
  list: PropTypes.array,
  onDismiss: PropTypes.func
};
