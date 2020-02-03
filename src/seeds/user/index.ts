import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<User> {
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
    console.log(`BEFORE POST INSERTED: `, event.entity);
  }
}
