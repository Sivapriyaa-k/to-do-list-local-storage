document.addEventListener('DOMContentLoaded', () => {
    var todo_input = document.getElementById('todo-input');
    var add_btn = document.getElementById('add-task-btn');
    const list = document.getElementById('todo-list');

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
        renderedTasks(task)
    });
    add_btn.addEventListener("click", function () {
        var todo_value = todo_input.value.trim();
        if (todo_value === "") return;
        var newTask = {
            id: Date.now(),
            text: todo_value,
            completed: false
        }

        tasks.push(newTask);
        saveTasks();
        renderedTasks(newTask)
        // list.createElement("li");

        todo_input.value = "";
    })

    function renderedTasks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed")
        li.innerHTML = `<span>${task.text}</span><button id="">Delete</button>`;
        list.appendChild(li);
        // list.innerHTML = li
        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") {
                tasks = tasks.filter(t => t.id !== task.id)
                li.remove();
                saveTasks();

            };
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        })

    }
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    document.getElementById("delete")
})