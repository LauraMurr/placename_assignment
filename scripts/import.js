import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// Define the path to the db.json file
const dbJsonPath = path.resolve('src/models/json/db.json');

// Check if the db.json file exists
if (!fs.existsSync(dbJsonPath)) {
  console.error(`Error: ${dbJsonPath} does not exist.`);
  process.exit(1);
}

// Read the db.json file
const data = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

// Ensure the scripts directory exists
const scriptsDir = path.resolve('scripts');
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir);
}

// Write data to individual files in the scripts directory
fs.writeFileSync(path.join(scriptsDir, 'users.json'), JSON.stringify(data.users, null, 2));
fs.writeFileSync(path.join(scriptsDir, 'locations.json'), JSON.stringify(data.locations, null, 2));
fs.writeFileSync(path.join(scriptsDir, 'details.json'), JSON.stringify(data.details, null, 2));
fs.writeFileSync(path.join(scriptsDir, 'reviews.json'), JSON.stringify(data.reviews, null, 2));
fs.writeFileSync(path.join(scriptsDir, 'userLocations.json'), JSON.stringify(data.userLocations, null, 2));

// Define the database name
const dbName = 'your_database_name';

// Function to import data using mongoimport
const importData = (collection, file) => {
  const command = `mongoimport --db ${dbName} --collection ${collection} --file scripts/${file} --jsonArray`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error importing ${collection}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

// Import each collection
importData('users', 'users.json');
importData('locations', 'locations.json');
importData('details', 'details.json');
importData('reviews', 'reviews.json');
importData('userLocations', 'userLocations.json');


