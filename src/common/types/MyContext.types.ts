import { Request, Response } from 'express';
import DataLoader = require('dataloader');
import { PollOption } from 'src/entities/poll-option/poll-option.entity';

export interface MyContext {
  req: Request;
  res: Response;
  pollOptionLoader: DataLoader<number, PollOption[]>;
}
