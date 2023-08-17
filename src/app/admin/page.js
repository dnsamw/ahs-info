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
import toast from "react-hot-toast"
import "react-datepicker/dist/react-datepicker.css";

export default function Admin() {
  const { data: session } = useSession();
  const isSign = session?.user?.email ? false : true;
  const dataRef = collection(database, "Backend");
  const [backData, setBackData] = useState([]);
  const [loc, setLoc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");


  const addClick = async () => {
    try {
      await addDoc(dataRef, {
        loc,
        selectedTime,
        startDate
      });
      toast.success('Success')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

  const getData = async () => {
    try {
      const data = await getDocs(dataRef);

      const fillData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
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
      toast.success('Success')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!')
    }
  };

  const deleteBack = async (id) => {
    const backDock = doc(database, "Backend", id);
    try {
      await deleteDoc(backDock);
      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong!')
    }
  };

const getDate=(fieldVal)=>{
  const timeStamp = new Timestamp(fieldVal.seconds, 
    fieldVal.nanoseconds);
    const date=new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);
    
    return dateFormat(date, "dddd, mmmm dS, yyyy")
}

  return (
    <>
      <h1>{session?.user?.email}</h1>
      {isSign ? (
        <button onClick={() => {}}>
          <p>SIGN IN</p>
        </button>
      ) : (
        <button type="button" onClick={() => signOut()}>
          SIGN OUT
        </button>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "30px",
        }}
      >
        <div>
          <input
            type="text"
            placeholder="location"
            onChange={(e) => setLoc(e.target.value)}
          />
        </div>
        <div>
          {" "}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            timeCaption="Time"
          />
        </div>
        <div>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <div>
          <button onClick={addClick}>Add</button>
        </div>
      </div>
      <div>
        {backData.length > 0 &&
          backData.map((data) => (
            <div
              key={data.id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            > 
            
              <div>{data.loc}</div>
              <div>{getDate(data?.startDate)}</div>
              <div>{data?.selectedTime }</div>
              <div>
                <button onClick={() => updateBack(data.id)}>update</button>
              </div>
              <div>
                <button onClick={() => deleteBack(data.id)}>delete</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
