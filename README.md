# Rogue Explorer

Simple roguelike tile-based map with limited interactions.

# Setup

#### Downloading game assets
```
curl https://opengameart.org/sites/default/files/crawl-tiles%20Oct-5-2010.zip > images.zip
unzip images.zip -d ./client/images
rm images.zip
```

#### Install server packages
```
cd server
npm install
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
    - [x] Create socket.io server for requests
    - [x] Use memory for data
    - [x] Create client ui with canvas
    - [x] Connect client to server
- Gameplay
    - [x] Moving around
        - [x] Coordinate-based
    - [x] Collision detection
    - [x] Multiple players
    - [x] Health system
    - [ ] Fighting enemies
    - [ ] Picking up items
    - [ ] Inventory system
    - [ ] Multiple levels
    - [ ] Persistence

## Version 1

- Tech
    - [ ] Create socket.io server (with express for authentication) to handle requests
    - [ ] Switch to typescript on both sides
    - [ ] Use redis to handle item, user, and map data
    - [ ] Create client ui with react
    - [ ] Connect client to server
- Gameplay
    - [ ] Transfer from prototype
