import * as moment from "moment";

export class eventEntity {
  public momentDate : moment.Moment;
  constructor(public name: string, public date: Date) {
    this.momentDate = moment(date);

  }
}
