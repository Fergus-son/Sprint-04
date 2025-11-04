//ПАТТЕРНЫ subscriber === handler === listener == watcher === observer

//store.subscribe(function() {}) // стор изменился
//button.addEventListener('click', function() {}) //кнопка была нажата
//setTimeout(function() {}, 2000) //прошло 2 секунды

// app.get('/users', function() {}) //роут был вызван
// fs.watch('test.txt', function() {}) //файл был изменен
// websocket.on('message', function() {}) //сообщение было отправлено



// const button = {

//    subscribers: {
//       click: [],
//       focus: []
//    },

//    addEventListener(eventName, subscriber) {
//          button.subscribers[eventName].push(subscriber)
//          return () => {
//              button.removeEventListener(eventName, subscriber)
//          }
//    },

//    click() {
//       console.log('click')
//       button.subscribers.click.forEach((c) => c())
//    },

//    removeEventListener(eventName, subscriber) {
//         button.subscribers[eventName] = button.subscribers[eventName].filter((s) => s !== subscriber)
//    }

// }

// const handler = function() {
//    console.log('click handler')
// }

// const unsubscribe = button.addEventListener('click', handler)

// button.click()

// unsubscribe()

// // button.removeEventListener('click', handler)

// button.click()





// const publisher = {
//     subscribers: {

//     },
//     subscribe(eventName, subscriber) {
//         if (!this.subscribers[eventName]) {
//             this.subscribers[eventName] = [];
//         }
//         this.subscribers[eventName].push(subscriber);
//     },
//     unsubscribe(eventName, subscriber) {
//         if (!this.subscribers[eventName]) return;
//         this.subscribers[eventName] = this.subscribers[eventName].filter(sub => sub !== subscriber);
//     },
//     publish(eventName, data) {
//         if (!this.subscribers[eventName]) return;
//         this.subscribers[eventName].forEach(subscriber => subscriber(data));
//     }
// }


// const sendEmail = (data) => {
//     console.log(`send email for user ${data.username}`)
// }

// const sendSms = (data) => {
//     console.log(`send sendSms for user ${data.username}`)
// }

// publisher.subscribe('USER_CREATED', sendEmail)
// publisher.subscribe('USER_CREATED', sendSms)

// function createUser(username) {
//    const user = {
//       username
//    }

//    publisher.publish('USER_CREATED', user)

//    return user
// }

// publisher.subscribe('userUpdated', sendEmail)
// function updatedUser(name) {
//     const user = { name };
//     console.log('Пользователь изменен!');
//     publisher.publish('userUpdated', user);
// }



//СОБЫТИЯ

const smallDiv = document.querySelector('#small')
const mediumDiv = document.querySelector('#medium')
const bigDiv = document.querySelector('#big')
const link = document.querySelector('#linkId')

const handler = (event) => {
   event.stopPropagation()
   console.log('target: ', event.target.id)
   console.log('currentTarget: ', event.currentTarget.id)
}

smallDiv.addEventListener('click', handler)
mediumDiv.addEventListener('click', handler)
bigDiv.addEventListener('click', handler)

const linkHandler = (event) => {
      event.preventDefault()
      console.log('link click')
}

link.addEventListener('click', linkHandler)






