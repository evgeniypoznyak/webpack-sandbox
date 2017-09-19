// Можно написать здесь целую программу, с классами, методами и т.д
// Потом ее можно преобразовать в объект и экспорт сделать

function notify (message) {
    console.log(message);
}

function notify2 (message) {
    console.log(message);
}

export default {
    notify: notify,
    notify2: notify2
};