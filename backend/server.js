const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;
const transformedData = {};

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb://3.90.28.2:27017/jenkinsDB';
mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

mongoose.connection.once('open', async () => {
    const BuildSummary = mongoose.model('BuildSummary', new mongoose.Schema({}, {
        strict: false
    }), 'buildSummary');

    const documents = await BuildSummary.find();

    documents.forEach(doc => {
        if (doc.gitURL) {
            const key = doc.gitURL.split('/').slice(-2, -1)[0];
            if (!transformedData[key]) {
                transformedData[key] = {};
            }

            const env = doc.deployEnv === 'prod' ? 'prod' : 'dev';
            transformedData[key][env] = {
                timestamp: doc.timestamp,
                author: doc.author,
                deployEnv: doc.deployEnv,
                buildName: doc.buildName,
                buildURL: doc.buildURL,
                gitURL: doc.gitURL,
                gitBranch: doc.gitBranch,
                timeRequired: doc.timeRequired
            };
        }
    });

    console.log(transformedData);

});


app.get('/api/data', (req, res) => {
    res.json(transformedData);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});