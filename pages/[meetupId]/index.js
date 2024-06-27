import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';
import Head from "next/head";


// export default function MeetupDetail() {
//   return (
//     <MeetupDetails
//       image='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg/640px-Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg'
//       title='First Meetup'
//       address='Some Street 5, Some city'
//       description='This is a first meetup'
//     />
//   );
// };

export default function MeetupDetail(props) {
  console.log(props.meetupData);
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name='description'
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetails meetupData={props.meetupData} />
    </>
  );
};

export async function getStaticPaths() {

  const client = await MongoClient.connect('mongodb+srv://eusoncode:T5Ytq5yI3xliwJiJ@cluster0.hfjnc2t.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); //table in the meetups database
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data from an API

  const client = await MongoClient.connect('mongodb+srv://eusoncode:T5Ytq5yI3xliwJiJ@cluster0.hfjnc2t.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); //table in the meetups database
  const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId)});

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}