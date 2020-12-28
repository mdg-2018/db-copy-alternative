# Copying a database in newer versions of MongoDB
Recent MongoDB versions no longer support a database copy command. The natural workaround would be to use mongodump and mongorestore, but this might be undesireable from a networking perspective since data would have to be streamed from the MongoDB cluster to the machine running mongodump/mongorestore and back into the MongoDB cluster.

This script is an example of how we can use server-size Javascript to achieve a similar workflow to MongoDB's previously supported copy command.

The script <code>copy.js</code> takes these steps
1. Loads data into a database called <code>00</code>. This simulates data being loaded into a development cluster from production. This would probably be done with a mongodump/mongorestore, but we're just simulating it here.
2. Creates target databases based on a list of teams.
3. Creates necessary collections and indexes.
4. Copy data from the <code>00</code> database into each team's database.


<code>run.sh</code> provides an example of how to execute the javascript file in the MongoDB shell.