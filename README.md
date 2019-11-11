# Schmemory starter kit

This starter kit includes babel, sass, webpack and webpack-dev-server to hopefully help with
reducing the time spent on boilerplate stuff. Please start by running

```bash
npm install
```

This will get these packages installed. When that's done, you can — at any time — do `npm start` to
run a development server.

If you are interested in using a simple server to produce images for your cards, you can look in the
sub-folder [example-image-server](./example-image-server).

## How to Run 
1. Terminal 2 run `npm run start:server`
2. Terminal 1 run `npm run start`

## Tested Browsers
1. Chrome
2. Safari
3. IOS safari - not reponsive design

## Alternate Ways / Improvements 

1. Store the whole state of the game a object and restore app state when needed.
    `const state = [{
        url: IMAGE_URL,
        id: ID,
        active: boolean,
        matched: boolean,
    },
    {
        url: IMAGE_URL,
        id: ID,
        active: boolean,
        matched: boolean,
    },
    {
        url: IMAGE_URL,
        id: ID,
        active: boolean,
        matched: boolean,
    }, ...]
    `

2. Responsive design usign media query
