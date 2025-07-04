import "./App.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddButton from "./components/AddButton";
import { useEffect, useState } from "react";
import RemoveButton from "./components/RemoveButton";
import EditButton from "./components/EditButton";
import { type Event } from "@/types/Event";
import { ModeToggle } from "./components/ui/mode-toggle";
import AddCategory from "./components/AddCategory";

function App() {
  // const events: Event[] = [{ name: "Event 1", deadline: "31-06-2025" }];
  function subtractDates(date1: Date, date2: Date) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diffInMilliseconds = date1.getTime() - date2.getTime();
    return Math.ceil(diffInMilliseconds / oneDay); // Convert milliseconds to days
  }

  const [events, setEvents] = useState<Event[]>([]);
  const loadData = () => {
    const raw = localStorage.getItem("events");
    if (raw == "null")
      return localStorage.setItem("events", JSON.stringify([]));
    let data: Event[] = [];
    if (raw) {
      try {
        data = JSON.parse(raw);
        data = data.filter((event) => {
          const deadlineDate = new Date(event.deadline as Date);
          const today = new Date();
          deadlineDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          return today.getTime() < deadlineDate.getTime();
        });
      } catch (e) {
        console.error(
          "An error occured while trying to parse localStorage data: ",
          e
        );
        data = [];
      }
    } else {
      data = [];
    }

    setEvents(data);
    localStorage.setItem("events", JSON.stringify(data));
  };
  useEffect(() => {
    loadData();
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("dataUpdated", handleUpdate);

    return () => {
      window.removeEventListener("dataUpdated", handleUpdate);
    };
  }, []);

  return (
    <>
      <Table>
        <TableCaption>Events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Event name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Event deadline</TableHead>
            <TableHead>Time until deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {events.map(({ id, name, category, deadline }, index) => {
            const deadlineDate = new Date(deadline as Date);
            const format = deadlineDate.toLocaleDateString("pl-PL");
            const amountOfDaysLeft = subtractDates(deadlineDate, new Date());
            const lessThanFourDaysLeft = amountOfDaysLeft <= 3;
            return (
              <TableRow key={index}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <AddCategory
                    id={id}
                    category={category == "" ? "" : category}
                  />
                </TableCell>
                <TableCell>{format}</TableCell>
                <TableCell
                  className={lessThanFourDaysLeft ? "text-destructive" : ""}
                >
                  {`${amountOfDaysLeft} ${
                    amountOfDaysLeft === 1 ? "day" : "days"
                  }`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-4">
        <AddButton />
        <EditButton />
        <RemoveButton />
        <ModeToggle />
      </div>
    </>
  );
}

export default App;
