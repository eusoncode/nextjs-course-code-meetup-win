import classes from './MeetupDetails.module.css';

export default function MeetupDetails({ meetupData }) {

  return (
    <section className={classes.details}>
      <img
        src={meetupData.image}
        alt={meetupData.title}
      />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </section>
  )
}