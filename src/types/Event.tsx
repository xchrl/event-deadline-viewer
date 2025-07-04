export type Event = {
  id: number;
  name: string;
  category: string;
  deadline: object | undefined;
};

export class CustomEvent implements Event {
  id: number;
  name: string;
  category: string = "";
  deadline: Date;

  constructor(name: string, deadline: object | undefined) {
    let currentIdCounter = localStorage.getItem("idCounter");
    if (
      currentIdCounter == null ||
      currentIdCounter == "null" ||
      currentIdCounter == "NaN"
    ) {
      localStorage.setItem("idCounter", "0");
      currentIdCounter = localStorage.getItem("idCounter");
    }
    this.id = parseInt(currentIdCounter as string);
    const nextIdCounter = this.id + 1;
    localStorage.setItem("idCounter", nextIdCounter.toString());
    this.name = name;
    this.deadline = new Date(deadline as Date);
  }
}
