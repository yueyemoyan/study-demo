const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TodoList", function () {
    let TodoList;
    let todoListInstance;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        console.log("owner address:", owner.address);
        TodoList = await ethers.getContractFactory("TodoList");
        todoListInstance = await TodoList.deploy();
        // 获取合约的地址
        console.log("Contract deployed to:", await todoListInstance.getAddress());
    });

    describe("addTodo", function () {
        it("should add a todo item", async function () {
            const result = await todoListInstance.addTodo("Buy groceries", "2023-10-01", { from: owner.address });
            const todoCount = await todoListInstance.getTodoList();
            expect(todoCount.length).to.equal(1, "Todo item was not added");
        });
    });

    describe("getTodoList", function () {
        it("should get the todo list", async function () {
            await todoListInstance.addTodo("Buy groceries", "2023-10-01", { from: owner.address });
            const todoList = await todoListInstance.getTodoList();
            expect(todoList.length).to.equal(1, "Todo list does not have the correct number of items");
            expect(todoList[0].name).to.equal("Buy groceries", "Todo name is incorrect");
            expect(todoList[0].date).to.equal("2023-10-01", "Todo date is incorrect");
        });
    });

    describe("deleteTodo", function () {
        it("should delete a todo item", async function () {
            await todoListInstance.addTodo("Buy groceries", "2023-10-01", { from: owner.address });
            await todoListInstance.deleteTodo(0, { from: owner.address });
            const todoList = await todoListInstance.getTodoList();
            expect(todoList.length).to.equal(0, "Todo item was not deleted");
        });
    });
});