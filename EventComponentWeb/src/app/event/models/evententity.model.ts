import * as moment from "moment";

export class eventEntity {
  public momentDate : moment.Moment;
  constructor(public key : string, public name: string, public description : string | null, public from: Date, public to: Date) {
    this.momentDate = moment(from);

  }
}
