import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://eusoncode:T5Ytq5yI3xliwJiJ@cluster0.hfjnc2t.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();

    const meetupsCollection = db.collection('meetups'); //table in the meetups database
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({message: 'Meetup inserted!'})
  }
}