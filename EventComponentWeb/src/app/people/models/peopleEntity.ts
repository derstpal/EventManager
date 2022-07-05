import { Gender } from './gender.enum';
import { Diet as Diet } from './diet.enum';
import * as moment from 'moment';

export class peopleEntity {
  public momentDate: moment.Moment;
  public isSelected : Boolean = false;
  constructor(
    public key: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthDay: Date,
    public diet : Diet,
    public gender : Gender,
  ) {
    this.momentDate = moment(birthDay);
  }
}
