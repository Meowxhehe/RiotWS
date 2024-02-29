import {WebSocket} from 'ws'

const TYPES = {
    WELCOME:     0,
    PREFIX:      1,
    CALL:        2,
    CALLRESULT:  3,
    CALLERROR:   4,
    SUBSCRIBE:   5,
    UNSUBSCRIBE: 6,
    PUBLISH:     7,
    EVENT:       8
}

class RiotWS extends WebSocket {
    constructor(password, ip, port) {
        // 'super' invokes the WebSocket
        super(`wss://riot:${password}@${ip}:${port}/`, { rejectUnauthorized: false })

        // Variable to store the current session in
        this.session = null
        this.on('message', this.MessageEvent.bind(this))
    }

    // Handle incoming message events
    MessageEvent(event) {
        const [type, ...data] = JSON.parse(message)

        if(type == TYPES.WELCOME) return this.session = data[0]
        if(type == TYPES.EVENT)   return this.emit(data[0], data[1])

        console.log('Unhandled Type:', [type, data])
    }

    // Subscribe to a topic with a callback
    subscribe(topic, callback) {
        super.addListener(topic, callback)
        this.send(TYPES.SUBSCRIBE, topic)
    }

    // Unsubscribe from a topic by the callback
    unsubscribe(topic, callback) {
        super.removeListener(topic, callback)
        this.send(TYPES.UNSUBSCRIBE, topic)
    }

    // Send a message to the server on a certain type
    send(type, message) {
        super.send(JSON.stringify([type, message]))
    }

    // Closes the connection and drops the current session data
    close() {
        super.close()
        this.session = null
    }
}

export { RiotWS }