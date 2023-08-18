"use client";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { database } from "../../../firebase";
import DatePicker from "react-datepicker";
import dateFormat, { masks } from "dateformat";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";

import variables from "../../styles/variables.module.scss";
import adminCss from "../../styles/admin.module.scss";
import styles from "../../app/page.module.css";

export default function Admin() {
  const { data: session } = useSession();
  const isSign = session?.user?.email ? false : true;
  const dataRef = collection(database, "Backend");
  const [backData, setBackData] = useState([]);
  const [loc, setLoc] = useState("Health centre, University of Jaffna");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [selectedTime2, setSelectedTime2] = useState("10:30");

  const addClick = async () => {
    try {
      await addDoc(dataRef, {
        loc,
        selectedTime,
        startDate,
        selectedTime2,
      });
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const getData = async () => {
    try {
      const data = await getDocs(dataRef);

      const fillData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBackData(fillData);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getData();
  }, []);

  const updateBack = async (id) => {
    const backDock = doc(database, "Backend", id);
    try {
      await updateDoc(backDock, { loc });
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const deleteBack = async (id) => {
    const backDock = doc(database, "Backend", id);
    try {
      await deleteDoc(backDock);
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const getDate = (fieldVal) => {
    const timeStamp = new Timestamp(fieldVal.seconds, fieldVal.nanoseconds);
    const date = new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
    );

    return dateFormat(date, "dddd, mmmm dS, yyyy");
  };

  return (
    <>
      <div className={adminCss.headerContainer}>
        <h4>Welcome, {session?.user?.email}</h4>
        {isSign ? (
          <button className={adminCss.btn} onClick={() => {}}>
            <p>LOGIN</p>
          </button>
        ) : (
          <span onClick={() => signOut()}>LOGOUT</span>
        )}
      </div>

      <div className={adminCss.main}>
        <div className={adminCss.loginContainer}>
          {/* <div> */}
          <label>Venue</label>
          <input
            type="text"
            value={loc}
            placeholder="location"
            onChange={(e) => setLoc(e.target.value)}
          />
          {/* </div> */}
          {/* <div> */} <label>Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            timeCaption="Time"
          />
          {/* </div> */}
          {/* <div> */}
          <label>Start Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          {/* </div> */}
          {/* <div> */}
          <label>End Time</label>
          <input
            type="time"
            value={selectedTime2}
            onChange={(e) => setSelectedTime2(e.target.value)}
          />
          {/* </div> */}
          <div>
            <button className={adminCss.btn} onClick={addClick}>
              Add
            </button>
          </div>
        </div>

        <div className={adminCss.loginContainer}>
          {backData.length > 0 &&
            backData.map((data) => (
              <div className={adminCss.dataContainer} key={data.id}>
                <div>{data.loc}</div>
                <div>{getDate(data?.startDate)}</div>
                <div>
                  {data?.selectedTime} - {data?.selectedTime2}
                </div>
                {/* <div>
                  <button onClick={() => updateBack(data.id)}>update</button>
                </div> */}
                <div>
                  <button
                    className={adminCss.btn}
                    onClick={() => deleteBack(data.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
