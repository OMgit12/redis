const Redis = require("ioredis");

const redis = new Redis();

// this is for single value set in the redis
const val = "hello"


redis.set("key", val)
    .then(() => {
        console.log("Value set successfully");
        // return redis.quit(); // Close the Redis connection
    })
    .catch((err) => {
        console.error("Error setting value:", err);
    });

redis.get("key", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});



// this is for multiple values set in the redis 
const keyValuePairs = {
    key1: "Hariom",
    key2: "Harry",
    key3: "Sharma",
};

// Convert the object to an array of key-value pairs
const entries = Object.entries(keyValuePairs).flat();
console.log(entries)


// Use the MSET command to set multiple values
redis
  .mset(...entries)
  .then(() => {
    console.log("Values set successfully");
    // return redis.quit(); // Close the Redis connection
  })
  .catch((err) => {
    console.error("Error setting values:", err);
  });

redis.mget("key1", (err, result) => {
  if (err) {
    console.log(err);
  } else {  
    console.log(result);
  }
});


async function setMultipleValues() {
    try {
        await redis.mset(...entries)
        console.log(`vlaues are set`)
    } catch (error) {
        console.log(`values are not set in this ${error}`)
    }
}

async function getMultipleValue(keys) {
    try {
        const Values = redis.mget(keys)
        console.log(`values has ${Values} values`)
    } catch (err) {
        console.log(err)
    } 
    finally{
        redis.quit()
    }
}

(async ()=>{
    await setMultipleValues()

    const keysToGet = ['key1', 'key2', 'key3'];
    await getMultipleValue(keysToGet);
})()