// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {
    struct todoList {
        string name;
        string date;
    }

    mapping(address => todoList[]) public userTodoList;

    function addTodo(string memory _name, string memory _date) external {
        userTodoList[msg.sender].push(todoList({name: _name, date: _date}));
    }

    function getTodoList() external view returns (todoList[] memory) {
        return userTodoList[msg.sender];
    }

    function deleteTodo(uint _index) external {
        require(_index < userTodoList[msg.sender].length, "Invalid index");
        for (uint i = _index; i < userTodoList[msg.sender].length - 1; i++) {
            userTodoList[msg.sender][i] = userTodoList[msg.sender][i + 1];
        }
        userTodoList[msg.sender].pop();
    }
}