// create database in which mongoimport data would land
db = db.getSiblingDB('00')

// insert sample data into database - in the real world, this would be done with mongodump/mongorestore, but we'll just simulate it here
const sampleData = [
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"},
    {"test":"test document"}
]

db.exampleCollection.insertMany(sampleData)

//create a list of teams that need a copy of the database
const teams = [
    "00Nationals",
    "00Yankees",
    "00Red_Sox",
    "00Mariners"
]


//merge data into each db
teams.forEach(team => {
    //create necessary indexes
    db = db.getSiblingDB(team)
    db.exampleCollection.createIndex({"test":1}) //don't forget to create indexes!
    
    //merge data
    db = db.getSiblingDB("00")
    db.exampleCollection.aggregate([
        {"$merge":{
            "into":{"db":team,"coll":"exampleCollection"}
        }}
    ])
})
