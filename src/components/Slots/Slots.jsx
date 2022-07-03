import React, { useEffect, useState } from "react";
import "./styles.css";
import SlotsData from "../../Data/SlotsData";

function Slots({ setNewSlots }) {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const bookedSlotsArray = [];
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    console.log("Selected Slots", selectedSlots);
  }, [selectedSlots]);

  useEffect(() => {
    getStartTime();
  }, [selectedSlots]);

  useEffect(() => {
    setNewSlots(selectedSlots);
  }, [selectedSlots]);

  const getStartTime = () => {
    if (!selectedSlots.length) {
      return;
    } else {
      selectedSlots.sort((a, b) => a - b);
      let startT = SlotsData[selectedSlots[0] - 1].start;
      let endT =
        SlotsData[
          selectedSlots[
            selectedSlots.length > 1
              ? selectedSlots.length - 2
              : selectedSlots.length - 1
          ]
        ].end;
      setStartTime(startT);
      setEndTime(endT);
    }
  };

  const slotClicked = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const SlotsComponent = () => (
    <div className="slots-container">
      <div className="slots-inner-container">
        {SlotsData.map((slot, index) => (
          <div
            onClick={() => {
              slotClicked(slot.id);
            }}
            className="slot-items"
            key={index}
          >
            <div
              className={[
                bookedSlotsArray.includes(slot.id)
                  ? "disabled-slots"
                  : selectedSlots.includes(slot.id)
                  ? "selected-slot-circle"
                  : "slot-circle",
              ]}
            ></div>
            <p>
              {slot.start}:00 - {slot.end}:00
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return <SlotsComponent />;
}

export default Slots;
