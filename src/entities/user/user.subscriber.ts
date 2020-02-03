import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<User>) {
    // tslint:disable-next-line:no-console
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }
}
