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

function RemoveButton() {
  const [name, setName] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const existingData = localStorage.getItem("events");
    let parsedData: Event[] = [];

    if (existingData) parsedData = JSON.parse(existingData);
    const newData: Event[] = parsedData.filter((event) => event.name !== name);
    localStorage.setItem("events", JSON.stringify(newData));
    window.dispatchEvent(new Event("dataUpdated"));
  };

  return (
    <Dialog>
      <form id="removeEventForm" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="destructive">Remove event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove event</DialogTitle>
            <DialogDescription>Remove an existing event.</DialogDescription>
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                form="removeEventForm"
                variant="destructive"
              >
                Remove
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default RemoveButton;
