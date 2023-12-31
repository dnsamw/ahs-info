"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import variables from "../styles/variables.module.scss";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";
import { Dna } from "react-loader-spinner";
import dateFormat, { masks } from "dateformat";

export default function Home() {
  const dataRef = collection(database, "Backend");
  const [data, setData] = useState({
    mainTitle:
      "Assessment of Cardiovascular Risk Factor Levels of Vegetarians and Non-Vegetarians",
    dateObj: { date: "17th, Thursday", reminderLink: "#" },
    timeObj: { timeRange: "9:00 - 10:30 am", reminderLink: "#" },
    venue: {
      name: "Health centre, University of Jaffna",
      locationLink: "https://maps.google.com",
    },
    messageParagraphs: [
      "Dear Sir/Madam,",
      "We are the students of the Faculty of Allied Health Sciences, University of Jaffna.",
      "We would like to kindly remind you that your blood collection will be taken place tomorrow (16th Wednesday) at Health centre, University of Jaffna.",
      "The process will be carried out from 9.00am - 10.30am. You can come and donate blood at your feasible time between this time duration.",
      "Prior to the blood collection we will measure your height, weight, blood pressure, skin fold thickness,waist and hip circumferences.",
      "8-10 hours fasting is recommended.Kindly note you can start fasting after having dinner. While you are permitted to consume water, we kindly asking you to avoid consuming any food, tea, or coffee.",
      "Thank you for your valuable participation.",
      "Best regards.",
    ],
  });

  const [firebaseData, setFirebaseData] = useState({});

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getDocs(dataRef);

      const fillData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFirebaseData(fillData[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getDate = (fieldVal) => {
    let timeStamp;
    let date = new Date();

    if (fieldVal) {
      timeStamp = new Timestamp(fieldVal?.seconds, fieldVal?.nanoseconds);
      date = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
      );
    }

    //console.log(dateFormat(date, "dddd, mmmm dS, yyyy"));
    return dateFormat(date, "dddd, mmmm dS, yyyy");
  };

  return (
    <main className={styles.main}>
      {/* {JSON.stringify(firebaseData)} */}
      <div className={variables.gradient}></div>
      <div id="ahs-app" className={variables.ashApp}>
        <div className={variables.messageContainer}>
          <div className={variables.appTitle}>
            <h1>{data.mainTitle}</h1>
          </div>
          <div id="message" className={variables.message}>
            {!loading && (
              <div>
                <p>Dear Sir/Madam,</p>
                <p>
                  We are the students of the Faculty of Allied Health Sciences,
                  University of Jaffna.
                </p>
                <p>
                  We would like to kindly remind you that your blood collection
                  will be taken place{" "}
                  <b>tomorrow ({getDate(firebaseData?.startDate)})</b> at{" "}
                  <b>{firebaseData?.loc}.</b>
                </p>
                <p>
                  The process will be carried out from{" "}
                  <b>
                    {firebaseData?.selectedTime} - {firebaseData?.selectedTime2}
                    am.
                  </b>{" "}
                  You can come and donate blood at your feasible time between
                  this time duration.
                </p>
                Prior to the blood collection we will measure your height,
                weight, blood pressure, skin fold thickness,waist and hip
                circumferences.
                <p>
                  8-10 hours fasting is recommended.Kindly note you can start
                  fasting after having dinner. While you are permitted to
                  consume water, we kindly asking you to avoid consuming any
                  food, tea, or coffee.
                </p>
                <p>Thank you for your valuable participation.</p>
                <p>Best regards.</p>
              </div>
            )}
          </div>
        </div>
        <div className={variables.cardContainer}>
          <div className={`${variables.card} ${variables.date}`}>
            <Dna
              visible={loading}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <div className={variables.cardIcon}>
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              )}
            </div>
            <div className={variables.cardText}>
              <p>{!loading && getDate(firebaseData?.startDate)}</p>
            </div>
          </div>
          <div className={`${variables.card} ${variables.venue}`}>
            <Dna
              visible={loading}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <div className={variables.cardIcon}>
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              )}
            </div>
            <div className={variables.cardText}>
              <p>{firebaseData?.loc}</p>
            </div>
          </div>
          <div className={`${variables.card} ${variables.time}`}>
            <Dna
              visible={loading}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <div className={variables.cardIcon}>
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className={variables.cardText}>
              <p>
                {firebaseData?.selectedTime}
                {!loading && " - "}
                {firebaseData?.selectedTime2}
                {!loading && " AM"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
