import * as moment from 'moment';

export class peopleEntity {
  public momentDate: moment.Moment;
  constructor(
    public key: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthDay: Date
  ) {
    this.momentDate = moment(birthDay);
  }
}
