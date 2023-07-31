package com.example.todo.todolist.command;

public interface TaskCommand {
    void execute();
    void undo();

}