//  | ___ \  ___|/ _ \/  __ \  _  | \ | |
//  | |_/ / |__ / /_\ \ /  \/ | | |  \| |
//  | ___ \  __||  _  | |   | | | | . ` |
//  | |_/ / |___| | | | \__/\ \_/ / |\  |
//  \____/\____/\_| |_/\____/\___/\_| \_/
//  Created by vncntwww
//  Caching and updating functions for the TurboTerms app

var version = "1.0.0";

function updateAppDialogue() {
    broadcast("!!! IMPORTANT !!!\n\nIf you are not receiving OTA updates (automatic Over-The-Air updates), you can update the App here manually.", "Update App", "Reinstall App", updateAppSure, reinstallApp);
}

function reinstallApp() {
    location.replace("https://turboterms.thebeaconcrafter.club/download");
}

function updateAppSure() {
    broadcast("Are you sure you want to update the app? This will recache all of your data (if you're offline, you won't be able to use the app until you connect to Wi-Fi again!)", "Yes", "No", updateApp, closeBroadcast);
}

function updateApp() {
    forceCacheResources();
    broadcast("Resources cached! Click below to reload", "This will reload", " and this as well :)", reloadPage, reloadPage);
}

function reloadPage() {
    location.reload();
}

const myCache = 'TURBOTERMS_CACHE';

// Your resource URLs to cache
const resourcesToCache = [
    '/',
            './manifest.json',
            './sw.js',
            './index.html',
            './script.js',
            './style.css',
            './img/turbotermslogofinal.png',
            './img/turbotermslogocrop.ico',
            './download',
            './download/index.html',
            './vocabbuilder',
            './vocabbuilder/index.html',
            './vocabbuilder/script.js',
            './caching/cache.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
            './dependencies/chart.js',
            './dependencies/dragdroptouch.js',
            './config.js',
];

// Open the cache and add resources to it
async function cacheResources() {
    try {
        const cache = await caches.open(myCache);
        await cache.addAll(resourcesToCache);
        console.log('Resources cached successfully!');
        broadcast("All resources were cached succesfully!", "Great :)", "", closeBroadcast, closeBroadcast);
    } catch (error) {
        console.error('Error caching resources:', error);
        broadcast("The following was not cached: " + error, "Oh no :(", "I don't care", closeBroadcast, closeBroadcast);
    }
}

async function forceCacheResources() {
        const cache = await caches.open(myCache);
        await cache.addAll(resourcesToCache);
        console.log('Resources cached successfully!');
}

//////////////////////
//BROADCAST FUNCTION//
//////////////////////

function broadcast(text, button1Text, button2Text, button1Action, button2Action) {

    //EXAMPLE broadcast("What do you want to do?", "Close", "Cancel", closeBroadcast, closeBroadcast)
  
    const popup = document.getElementById('broadcastPopup');
    const popupText = document.getElementById('broadcastText');
    const button1 = document.getElementById('broadcastButton1');
    const button2 = document.getElementById('broadcastButton2');
  
    popup.style.display = 'block';
    // Set the text and actions for the popup
    popupText.innerText = text;
    button1.innerText = button1Text;
    button2.innerText = button2Text;
    button1.onclick = button1Action;
    button2.onclick = button2Action;
  
    if(button2.innerText.length == 0) {
      button2.style.visibility = "hidden"
      button2.style.display = "none"
    } else {
      button2.style.visibility = "visible"
      button2.style.display = "inline-block"
    }
  
    // Show the popup
    
  
    
  }
  
  
  function closeBroadcast() {
    const popup = document.getElementById('broadcastPopup');
    popup.style.display = 'none';
  }