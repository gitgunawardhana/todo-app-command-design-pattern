# To-Do List Application

## Introduction

This is a simple To-Do List application built using Spring Boot, React, and Tailwind CSS. The application allows users to manage their tasks by adding, completing, and deleting them. It also includes the undo and redo functionality to revert and reapply changes. The application provides a RESTful API to interact with tasks and a modern user interface built with React and styled using Tailwind CSS.

The Command Design Pattern is utilized to implement the undo and redo functionality for tasks, offering a flexible and extensible approach. Each task-related action is encapsulated as a command object, enabling easy management and reversal of changes.

## Demo

Check out the application in action by watching the demo on YouTube: [To-Do List App Demo](https://youtu.be/jnWLeAB1WoU)

## Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- H2 Database (in-memory database)
- Maven
- React
- Tailwind CSS

## Features

- Add a new task with a description.
- Complete a task.
- Delete a task.
- Undo the last operation.
- Redo the last undone operation.

## Getting Started

To run the To-Do List application on your local machine, follow these steps:

1. Make sure you have Java (JDK) and Maven installed.
2. Clone this repository to your local machine.
3. Open the project in your favorite IDE (e.g., IntelliJ, Eclipse).
4. Build the project using Maven: `mvn clean install`.
5. Run the Spring Boot application: `mvn spring-boot:run`.
6. Navigate to the `frontend` directory: `cd frontend`.
7. Install the required dependencies for the React frontend: `npm install`.
8. Start the React development server: `npm start`.
9. The application will be accessible at `http://localhost:3000`.

## API Endpoints

- `GET /tasks`: Get all tasks.
- `GET /tasks/{id}`: Get a task by ID.
- `POST /tasks/add`: Add a new task with the provided description.
- `PUT /tasks/complete/{id}`: Complete a task by ID.
- `DELETE /tasks/delete/{id}`: Delete a task by ID.
- `POST /tasks/undo`: Undo the last operation.
- `POST /tasks/redo`: Redo the last undone operation.

## Example Usage

1. Add a new task:
   - Endpoint: `POST /tasks/add`
   - Request Body: `{ "description": "Buy groceries" }`
   - Response: `Task added successfully`

2. Complete a task:
   - Endpoint: `PUT /tasks/complete/1`
   - Response: `Task completed successfully`

3. Undo the last operation:
   - Endpoint: `POST /tasks/delete/1`
   - Response: `Task deleted successfully`

4. Undo the last operation:
   - Endpoint: `POST /tasks/undo`
   - Response: `Undo successfully`

5. Redo the last operation:
   - Endpoint: `POST /tasks/redo`
   - Response: `Redo successful`

## Command Design Pattern

The Command Design Pattern is a behavioral design pattern that allows encapsulating a request as an object, thereby allowing clients to parameterize different requests, queue them, and support undoable operations. In this To-Do List application, we have employed the Command Design Pattern to implement the undo and redo functionality for tasks.

### How It Works

1. **Command Interface (`TaskCommand`):**
   - This interface defines the common methods `execute()` and `undo()` that concrete command classes must implement. The `execute()` method is responsible for performing the command's action, and the `undo()` method is used to revert the action.

2. **Concrete Command Classes (`AddTaskCommand`, `CompleteTaskCommand`, `DeleteTaskCommand`):**
   - These classes implement the `TaskCommand` interface and represent specific actions on tasks: adding, completing, and deleting tasks. Each concrete command class takes a reference to the `TaskService` and a `Task` object (for `AddTaskCommand`, `CompleteTaskCommand`, and `DeleteTaskCommand`) to perform actions on tasks.

3. **Invoker (`TaskService`):**
   - The `TaskService` acts as the invoker in the Command pattern. It contains the undo and redo stacks to manage executed commands.
   - When a task-related action (add, complete, delete) is invoked, the `TaskService` creates a corresponding command object (e.g., `AddTaskCommand`, `CompleteTaskCommand`, `DeleteTaskCommand`) and calls its `execute()` method.
   - The `execute()` method performs the corresponding action on the task using the `TaskRepository`.

4. **Client (`TaskController`):**
   - The `TaskController` acts as the client in the Command pattern. It is responsible for handling HTTP requests related to tasks.
   - When a client request is received (e.g., add task, complete task, delete task), the `TaskController` invokes the corresponding method in the `TaskService`.
   - The `TaskService` creates and executes the appropriate command, and the action is performed on the task.

5. **Undo and Redo:**
   - To support undo and redo functionality, the `TaskService` maintains two stacks: `undoStack` and `redoStack`.
   - When an action is executed, the corresponding command is pushed onto the `undoStack`.
   - When an undo request is received, the `TaskService` pops the last command from the `undoStack`, calls its `undo()` method, and pushes the command onto the `redoStack`.
   - When a redo request is received, the `TaskService` pops the last command from the `redoStack`, calls its `execute()` method, and pushes the command back onto the `undoStack`.

By using the Command Design Pattern, we have achieved a flexible and extensible way to implement undo and redo functionality in the To-Do List application. Each task-related action is encapsulated as a command object, allowing us to manage and revert changes easily.

## Notes

- The application uses an in-memory H2 database for demonstration purposes. Data will be reset upon restarting the application.
- Cross-Origin Resource Sharing (CORS) is configured to allow requests from `http://127.0.0.1:5173`. You may need to update this configuration to match your frontend's domain.

## Contributions

Contributions to the project are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
