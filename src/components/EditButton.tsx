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

function EditButton() {
  const [id, setID] = useState<number>(0);
  const [newName, setNewName] = useState("");
  const [newDeadline, setNewDeadline] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const existingData = localStorage.getItem("events");
    let parsedData: Event[] = [];

    if (existingData) parsedData = JSON.parse(existingData);
    const updatedData = parsedData.map((event) =>
      event.id == id ? { name: newName, deadline: newDeadline } : event
    );
    localStorage.setItem("events", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("dataUpdated"));
  };

  return (
    <Dialog>
      <form id="editEventForm" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit event</DialogTitle>
            <DialogDescription>Edit an existing event.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Event ID</Label>
              <Input
                id="name"
                name="name"
                onChange={(e) => setID(parseInt(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="deadline">New event name</Label>
              <Input
                id="newName"
                name="newName"
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="deadline">New event deadline</Label>
              <Calendar22 date={newDeadline} setDate={setNewDeadline} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="editEventForm">
                Edit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default EditButton;
