import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  /* Cron expression
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | months
    | | | day of month
    | | hours
    | minutes
    seconds (optional)
   */
  // the handleCron() method will be called each time the current second is 45.
  @Cron('45 * * * * *')
  // @Cron(CronExpression.EVERY_30_SECONDS): 'Called every 30 seconds'
  // @Cron('* * 0 * * *', {
  //   name: 'notifications',
  //   timeZone: 'Europe/Paris',
  // })
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
