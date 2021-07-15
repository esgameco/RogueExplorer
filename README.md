# Rogue Explorer

Simple roguelike tile-based map with limited interactions.

# Setup

#### Downloading game assets
```
curl https://opengameart.org/sites/default/files/crawl-tiles%20Oct-5-2010.zip > images.zip
unzip images.zip -d ./client/images
rm images.zip
```

#### Running the client (dev only)
```
cd client
serve
```

#### Running the server (dev only)
```
cd server
npm run dev
```

# Roadmap

## Prototype Build

- Tech
    - &#9745; Create <s>websockets</s> socket.io server for requests
    - &#9745; Use memory for data
    - &#9745; Create client ui with canvas
    - &#9745; Connect client to server
- Gameplay
    - &#9745; Moving around
        - &#9745; Coordinate-based
    - &#9745; Collision detection
    - &#9745; Multiple players
    - &#9745; Health system
    - &#9744; Fighting enemies
    - &#9744; Picking up items
    - &#9744; Inventory system
    - &#9744; Multiple levels
    - &#9744; Persistence

## Version 1

- Tech
    - &#9744; Create socket.io server (with express for authentication) to handle requests
    - &#9744; Switch to typescript on both sides
    - &#9744; Use redis to handle item, user, and map data
    - &#9744; Create client ui with react
    - &#9744; Connect client to server
- Gameplay
    - &#9744; Transfer from prototype