var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ToDos_instances, _ToDos_backend_url, _ToDos_readJson, _ToDos_addToArray, _ToDos_removeFromArray;
import { Task } from './task.js';
class ToDos {
    constructor(url) {
        _ToDos_instances.add(this);
        this.tasks = [];
        _ToDos_backend_url.set(this, "");
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _ToDos_backend_url, "f"))
                    .then(response => response.json())
                    .then((response) => {
                    __classPrivateFieldGet(this, _ToDos_readJson, "f").call(this, response);
                    resolve(this.tasks); //resolve palauttaa promisen, eli tässä tapauksessa tasks-arrayn
                })
                    .catch((error) => {
                    reject(error); //reject palauttaa mahdollisen virheen
                });
            }));
        });
        this.addTask = (text) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const json = JSON.stringify({ description: text });
                fetch(__classPrivateFieldGet(this, _ToDos_backend_url, "f") + '/new', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                    .then(response => response.json())
                    .then((response) => {
                    resolve(__classPrivateFieldGet(this, _ToDos_instances, "m", _ToDos_addToArray).call(this, response.id, text));
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
        });
        this.removeTask = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _ToDos_backend_url, "f") + '/delete/' + id, {
                    method: 'delete',
                })
                    .then(response => response.json())
                    .then((response) => {
                    __classPrivateFieldGet(this, _ToDos_instances, "m", _ToDos_removeFromArray).call(this, id);
                    resolve(response.id);
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
        });
        _ToDos_readJson.set(this, (TasksAsjson) => {
            TasksAsjson.forEach(task => {
                this.tasks.push(new Task(task.id, task.description));
            });
        });
        __classPrivateFieldSet(this, _ToDos_backend_url, url, "f");
    }
}
_ToDos_backend_url = new WeakMap(), _ToDos_readJson = new WeakMap(), _ToDos_instances = new WeakSet(), _ToDos_addToArray = function _ToDos_addToArray(id, text) {
    const task = new Task(id, text);
    this.tasks.push(task);
    return task;
}, _ToDos_removeFromArray = function _ToDos_removeFromArray(id) {
    const remainingTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = remainingTasks;
};
;
export { ToDos };
