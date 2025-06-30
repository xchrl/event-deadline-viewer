import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { type Event } from "@/types/Event";
import Calendar22 from "./calendar-22";

function AddButton() {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (deadline == undefined) return "Fail: deadline isn't date";
    const newData: Event = { name, deadline };

    const existingData = localStorage.getItem("events");
    let parsedData: Event[] = [];

    if (existingData) parsedData = JSON.parse(existingData);
    parsedData.push(newData);
    localStorage.setItem("events", JSON.stringify(parsedData));
    window.dispatchEvent(new Event("dataUpdated"));
  };

  return (
    <Dialog>
      <form id="addEventForm" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button>Add event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new event</DialogTitle>
            <DialogDescription>Add a new event.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Event name</Label>
              <Input
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="deadline">Event deadline</Label>
              <Calendar22 date={deadline} setDate={setDeadline} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="addEventForm">
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddButton;
