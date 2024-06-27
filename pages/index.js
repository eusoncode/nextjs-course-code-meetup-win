import MeetupsList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head'

// Dummy data
// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg/640px-Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg',
//     address: '1919 SW Edmonton, AB',
//     description: 'This is our first meetup'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Restauracja_pod_Gigantami_06.JPG/640px-Restauracja_pod_Gigantami_06.JPG',
//     address: '1916 SW Edmonton, AB',
//     description: 'This is our first meetup'
// }
// ];

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active Reactive meetups!'
        />
      </Head>
      <MeetupsList meetups={props.meetups} />
    </>
  )
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect('mongodb+srv://eusoncode:T5Ytq5yI3xliwJiJ@cluster0.hfjnc2t.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); //table in the meetups database
  const meetups = await meetupsCollection.find().toArray();

  const DUMMY_MEETUPS = meetups.map(meetup => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }))

  client.close(); // Close connection

  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate:1
  };
}

// export async function getServerSideProps() {
//   // const req = context.req;
//   // const res = cotext.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }