# RiotWS

### Installation
`npm i Meowxhehe/RiotWS`

### Usage

```js
import { RiotWS } from 'riotws'

const socket = new RiotWS('<password>', '<ip>', '<port>')

socket.on('open', () => {
    socket.subscribe('OnJsonApiEvent', data => {
        // Do something with data
    })
})
```