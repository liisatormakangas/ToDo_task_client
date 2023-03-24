import { Task } from './task.js';

class ToDos {
    tasks: Array<Task> = [];
    #backend_url = "";

    constructor(url) {
        this.#backend_url = url;
    }

    getTasks = async () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url)
            .then(response => response.json())
            .then((response) => {
                this.#readJson(response);
                resolve(this.tasks);//resolve palauttaa promisen, eli tässä tapauksessa tasks-arrayn
            })
            .catch((error) => {
                reject(error);//reject palauttaa mahdollisen virheen
            })
        });
    };

    addTask = async (text: string) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({ description: text });
            fetch(this.#backend_url + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then((response) => {
                resolve(this.#addToArray(response.id, text));
            })
            .catch((error) => {
                reject(error)
            });
        });
    };

    removeTask = async (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {
                method: 'delete',
            })
            .then(response => response.json())
            .then((response) => {
                this.#removeFromArray(id)
                resolve(response.id);
            })
            .catch((error) => {
                reject(error)
            });
        });
    };

    #readJson = (TasksAsjson: any): void => {
        TasksAsjson.forEach(task => {
            this.tasks.push(new Task(task.id, task.description));
        });
    }
    #addToArray(id: number, text: string) {
        const task = new Task(id, text);
        this.tasks.push(task);
        return task
    }
    #removeFromArray(id: number): void {
        const remainingTasks = this.tasks.filter((task) => task.id !== id);
        this.tasks = remainingTasks;
    }
};

export { ToDos };